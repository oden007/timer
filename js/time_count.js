var start_time;
var stop_time;
var timer_function;
var counter_time=0;
var start_to_stop;
console.log(location.href);
var socket = io.connect(location.href);

if(Cookies.get('count')){
    counter_time=Cookies.get('count');
    console.log(counter_time);
    document.getElementById("time_count").innerHTML=display_time(counter_time);
    document.getElementById("clear").disabled=false;
    document.getElementById("clear").style="opacity:0.8;"
    
}
if(Cookies.get('start', start_time)){

    start_time=new Date(Cookies.get('start'));
    document.getElementById("start_and_stop").innerHTML='<button id="stop" onclick="stop_time(this)">stop</button>';
    timer_function=setInterval("set_time()", 10);
    document.getElementById("clear").style="opacity:1.0;"
}
function get_time(){
    //socket.send("start");
    if(!Cookies.get('start'))
    start_time=new Date();
    if(Cookies.get('count')){
    counter_time=Cookies.get('count');
    }
    document.getElementById("clear").style="opacity:1.0;"
    document.getElementById("clear").disabled=true;
    console.log(start_time);
    Cookies.set('start', start_time,{ expires: 1/2 });//cookieの追加
    document.getElementById("start_and_stop").innerHTML='<button id="stop" onclick="stop_time(this)">stop</button>';
    timer_function=setInterval("set_time()", 10);
}

function stop_time(){
    clearInterval(timer_function);
    end_time=new Date();
    console.log(counter_time);
    start_to_stop=end_time-start_time+parseInt(counter_time);
    console.log(start_to_stop);
    document.getElementById("clear").style="opacity:0.8;"
    Cookies.set('count',start_to_stop, { expires: 1 });
    document.getElementById("time_count").innerHTML=display_time(start_to_stop);
    document.getElementById("start_and_stop").innerHTML='<button id="start" onclick="get_time(this)">start</button>';
    document.getElementById("clear").disabled=false;
    Cookies.remove('start');
}

function set_time(){
    tmp_time=new Date();
    diff=tmp_time-start_time+parseInt(counter_time);
    document.getElementById("time_count").innerHTML=display_time(diff);
}

function clear_coolie(button){
    if(Cookies.get('count', counter_time));
    Cookies.remove('count');
    button.disabled=true;
    counter_time=0;
    document.getElementById("time_count").innerHTML="00:00:00:000";
}

function display_time(diff){
    hour=Math.floor(diff/(1000*60*60));
    minute=Math.floor(diff/(1000*60))-(60*hour);
    second=Math.floor(diff/(1000))-(60*minute)-(3600*hour);
    m_second=Math.floor(diff)-(1000*second)-(60*1000*minute)-(3600*1000*hour);
    if(hour<10)
    hour="0"+hour;
    if(minute<10)
    minute="0"+minute;
    if(second<10)
    second="0"+second;
    if(m_second<10)
    m_second="00"+m_second;
    else if(m_second<100)
    m_second="0"+m_second;
    return hour+":"+minute+":"+second+":"+m_second;
}
