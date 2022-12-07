var user_submit = function () {
    var fname = document.getElementById("fname");
    var lname = document.getElementById("lname");
    var course = document.getElementById("course");
    var artifact = document.getElementById("artifact");
    var room = document.getElementById("room");
    var station = document.getElementById("station");
    var date = document.getElementById("date");
    var time = document.getElementById("time");

    var data = {
        "fname": fname.value,
        "lname": lname.value,
        "course": course.value,
        "artifact": artifact.value,
        "room": room.value,
        "station": station.value,
        "date": date.value,
        "time": time.value
    }

    push_to_firebase(data);
}

