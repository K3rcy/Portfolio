var miliseconds = 0;
var interval = null;

function start() {
    if (interval) return; // Timer is already running
    interval = setInterval(() => {
        miliseconds++;
        document.getElementById('runningTime').innerHTML=(miliseconds/100);
    }, 10);
}
function stop() {
    clearInterval(interval);
    interval = null;
}

function reset() {
    stop();
    document.getElementById('runningTime').innerHTML='0.00';
    miliseconds = 0;
    console.log("Reset:", miliseconds);
}