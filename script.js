
let cities = [
    {
        arabicName:"الرياض",
        name:"Ar Riyāḑ"
    },
    {
        arabicName:"الحدود الشمالية",
        name:"Al Ḩudūd ash Shamālīyah"
    },
    {
        arabicName:"حائل",
        name:"Ḩā'il"
    },
    {
        arabicName:"مكه المكرمة",
        name:"Makkah al Mukarramah"
    },
    {
        arabicName:"المدينة المنوره",
        name:"Al Madīnah al Munawwarah"
    },
     {
        arabicName:"القصيم",
        name:"Al Qaşīm"
    },
    {
        arabicName:"الباحة",
        name:"Al Bāḩah"
    },
    {
        arabicName:"تبوك",
        name:"Tabūk"
    },
    {
        arabicName:"عسير",
        name:"'Asīr"
    },
    {
        arabicName:"الشرقيه",
        name:"Ash Sharqīyah"
    },
    {
        arabicName:"جازان",
        name:"Jāzān"
    },
    {
        arabicName:"الجوف",
        name:"Al Jawf"
    },
    {
        arabicName:"نجران",
        name:"Najrān"
    },
    
    
];
for(let city of cities){
    let content = `<option>${city.arabicName}</option>`;
    document.getElementById("cities-select").innerHTML +=content;


}
document.getElementById("cities-select").addEventListener("change",function(){
    document.querySelector(".city-name").innerHTML = this.value;
    let cityName = "";
    for(let city of cities){
        if(city.arabicName == this.value){
            cityName = city.name;
        }
    }
getPrayersTimeingsOfCity(cityName)
    

})

function getPrayersTimeingsOfCity(cityName){
    let params = {
        country:"SA",
        city:cityName
    }
    
    axios.get('https://api.aladhan.com/v1/timingsByCity', {
        params:params
      })
      .then(function (response) {
        let timing = response.data.data.timings;
        let readableDate = response.data.data.date.readable;
        let weekDay = response.data.data.date.hijri.weekday.ar;
        let date = document.getElementById("date");
        date.innerHTML = weekDay;
        date.innerHTML += `/  ${readableDate}`;
        
        fillTimeForPrayer("fajr-time",timing.Fajr)
        fillTimeForPrayer("sunrise-time",timing.Sunrise
        )
        fillTimeForPrayer("duhr-time",timing.Dhuhr)
        fillTimeForPrayer("asr-time",timing.Asr)
        fillTimeForPrayer("maghrb-time",timing.Maghrib)
        fillTimeForPrayer("isha-time",timing.Isha)
      
        
      })
      .catch(function (error) {
        console.log(error);
      })

}


  function fillTimeForPrayer(id,time){
    document.getElementById(id).innerHTML=time;
  }

  window.onload = function(){
    getPrayersTimeingsOfCity("Ar Riyāḑ");
  }