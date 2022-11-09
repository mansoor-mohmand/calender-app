const getSunday=(date)=>{
    let day_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let sunday = "";
    sunday = new Date(`${date}`).getDay();   
    sunday = (day_names[sunday]=="Sunday")?"sunday":"";
    return sunday;
}

const isCurrentDate=(date)=>{
    const current = new Date();
    let current_YearMonth = `${current.getFullYear()}/${current.getMonth()}`;
    let date_YearMonth = `${date.getFullYear()}/${date.getMonth()}`;

    return current_YearMonth==date_YearMonth;
}


const setTodayDate=(year_number="",month_number="",date_number = "")=>{

    const date = new Date();
    date.setFullYear((year_number!=="")?year_number:date.getFullYear());
    if(month_number!=="") date.setMonth(month_number);
    if(date_number!=="") date.setDate(date_number);
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const day_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    const date_data =  {
        day:day_names[date.getDay()],
        date:(date.getDate()<10)?`0${date.getDate()}`:date.getDate(),
        month: months[date.getMonth()],
        numericMonth:date.getMonth(),
        year:date.getFullYear()
    }
    
    return date_data;    
}

const ForAll=(arr,data)=>{
    arr.forEach(element => {
        element.textContent = data;
    });
}

const CurrentDate=()=>
{
    const today = setTodayDate();

    const current_day = document.querySelectorAll(".current_day");
    const current_date = document.querySelectorAll(".current_date");
    const current_month =document.querySelectorAll(".current_month");
    const current_year = document.querySelectorAll(".current_year");
    ForAll(current_day,today.day);
    ForAll(current_date,today.date);
    ForAll(current_month,today.month);
    ForAll(current_year,today.year);
}



function ShowCalender(year_number="",month_number=""){

    const date = new Date();

    date.setMonth((month_number!=="")?month_number:date.getMonth());
    date.setFullYear((year_number!=="")?year_number:date.getFullYear());

    const lastDay = new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
    const lastDay_PrevMonth = new Date(date.getFullYear(),date.getMonth(),0).getDate();
    let firstDayIndex = (month_number=="0")
    ?new Date(`${date.getFullYear()-1}/${12}/${lastDay_PrevMonth}`).getDay()
    :new Date(`${date.getFullYear()}/${date.getMonth()}/${lastDay_PrevMonth}`).getDay();
    let lastDayIndex = new Date(date.getFullYear(),date.getMonth()+1,0).getDay();
    let nextDays = 7 - lastDayIndex;

    let days = "";
    let d = "";
    let iscurrentdate = isCurrentDate(date);
    for(let p_m = firstDayIndex; p_m>0; p_m--)
    {
        days+=`<li class="date-item not--active">${lastDay_PrevMonth - p_m +1}</li>`;
    }
    for(let c_m = 1; c_m<=lastDay; c_m++)
    {
        d = `${date.getFullYear()}/${date.getMonth()+1}/${c_m}`;
        let t_date ="";
        if(iscurrentdate){
            t_date = (c_m==date.getDate())?"currentdate":"";
        }
        days+=`<li class="date-item ${getSunday(d)} ${t_date}">${c_m}</li>`;
    }
    for(let n_m = 1; n_m<=nextDays; n_m++)
    {
        d = `${date.getFullYear()}/${date.getMonth()+2}/${n_m}`;
    
        days+=`<li class="date-item not--active ${getSunday(d)}">${n_m}</li>`;
    }
    return days;
}

const modal_calender = document.querySelector("#modal_calender");

const showCalenderData = (modal="",year="",month="") =>{
    const today = setTodayDate(year,month,"");
    
    modal.dataset.year = today.year;
    modal.dataset.month = today.numericMonth;
    modal.querySelector("#month_name").innerText = today.month;
    modal.querySelector("#year_name").innerText = today.year;
    modal.querySelector(".dates #date_list").innerHTML = ShowCalender(year,month);

    datesEventListener(modal);
}



// -----------------------------------------------
const GetCalenders = (Year) =>{
    const calender_content = document.querySelector("#calender_content");
    let calenders ="";
    
    for(let month = 0; month<12; month++)
    {
        let today = setTodayDate(Year,month,"");
        calenders+=`
                <div class="calender" data-year="${today.year}" data-month="${today.numericMonth}">
                    <div class="month">
                        <h3 class="month-name">${today.month}</h3>
                        <div class="today">
                            <span class="current_date"></span>
                            <div>
                                <span class="current_day"></span>
                                <span class="current_month"></span>
                                <span class="current_year"></span>
                            </div>
                        </div>
                    </div>
                    <div class="day">
                        <span class="day-name">M</span>
                        <span class="day-name">T</span>
                        <span class="day-name">W</span>
                        <span class="day-name">T</span>
                        <span class="day-name">F</span>
                        <span class="day-name">S</span>
                        <span class="day-name">S</span>
                    </div>
                    <div class="dates">
                        <ul class="date-list" id="date_list">
                           ${ShowCalender(Year,month)}
                        </ul>
                    </div>
                </div>    
                `;
    }
    calender_content.innerHTML = calenders;
    CalenderEvent();
}


const CalenderEvent = ()=>{
    const allCalender = document.querySelectorAll(".calender-content .calender");
    const modal_calender = document.querySelector("#modal_calender");
    allCalender.forEach(c=>{
        c.addEventListener("click",()=>{
            modal_calender.classList.add("visible");
            let year = c.dataset.year;
            let month =c.dataset.month;
            showCalenderData(modal_calender,year,month);
        });
    });
}


const datesEventListener = (modal) =>{
    const allDates = modal.querySelectorAll("#date_list .date-item");
    let year = modal.dataset.year;  
    let month =modal.dataset.month;
    allDates.forEach(d=>{
        d.addEventListener("click",()=>{
           
            let date = d.textContent;
            const today = setTodayDate(year,month,date);

            document.querySelector("#current_day").textContent = today.day;
            document.querySelector("#current_date").textContent = today.date;
            document.querySelector("#current_month").textContent = today.month;
            document.querySelector("#current_year").textContent = today.year;
        });
    });
    
}


const close_modal_calender = document.querySelector("#modal_calender #close_modal_calender");

close_modal_calender.addEventListener("click",()=>{
    modal_calender.classList.remove("visible");
    addClass();
});


const next_btn = document.querySelector("#modal_calender #next");
const prev_btn = document.querySelector("#modal_calender #prev");
const refresh_btn = document.querySelector("#refresh_current_date");

const header_refresh_btn = document.querySelector("#header_refresh_btn");

const addClass = (cName)=>{
    const PN_Class = document.querySelector("#modal_calender .dates .date-list");
    PN_Class.classList.remove("prev");
    PN_Class.classList.remove("next");
    PN_Class.classList.remove("current"); 
    if(cName==="prev")
    {
        PN_Class.classList.add("prev");
    }
    else if(cName==="next")
    {
        PN_Class.classList.add("next");
    }
    else if(cName==="current")
    {
        PN_Class.classList.add("current");   
    }
    else{
        return;
    }
}

next_btn.addEventListener("click",()=>{

    addClass("next");
    let year = Number(modal_calender.dataset.year);
    let month = Number(modal_calender.dataset.month);
    if(month==11){
        month = 0;
        year = year + 1;
    } 
    else
    {
        month = month + 1;
    }
    showCalenderData(modal_calender,year,month); 
});


prev_btn.addEventListener("click",()=>{

    addClass("prev");
    let year = Number(modal_calender.dataset.year);
    let month = Number(modal_calender.dataset.month);
    if(month==0){
        month = 11;
        year = year - 1;
    } 
    else
    {
        month = month - 1;
    }
    showCalenderData(modal_calender,year,month);
});


refresh_btn.addEventListener("click",()=>{

    addClass("current")
    showCalenderData(modal_calender);
    CurrentDate();

});

header_refresh_btn.addEventListener("click",()=>{
    GetYear();
    GetCalenders();
    CurrentDate();
});

function GetYear(year_number="")
{
    const date = new Date();
    if(year_number!=="")
    {
        date.setFullYear(Number(year_number))
    }
    else
    {
        year_number = date.getFullYear();
    }
    const year_list = document.querySelector(".header .years #year_list"); 
    let year_item = "";

    for(let p = 20; p>0; p--)
    {
        year_item+=`<li class="years-item">${year_number - p}</li>`;
    }
        year_item+=`<li class="years-item  current">${year_number}</li>`;
    
        for(let n = 1; n<=20; n++)
    {
        year_item+=`<li class="years-item">${year_number + n}</li>`;
    }
    year_list.innerHTML=year_item;
    var years_container = document.querySelector(".years");
    var scroll_position = years_container.scrollWidth / 2.20101;
    years_container.scrollTo({left:scroll_position});

    YearEvents();
    
}

function YearEvents()
{

    const year_items = document.querySelectorAll(".years-item");
    year_items.forEach(y=>{
        y.addEventListener("click",()=>{
            let selectedYear = parseInt(y.textContent);
            GetYear(selectedYear);
            GetCalenders(selectedYear);
            CurrentDate();
        });
    });
}




GetYear();
GetCalenders();
CurrentDate();