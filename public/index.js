const firebaseConfig = {
    apiKey: "AIzaSyAk2e-TAVz2A15hJ7mo3_APrm7NgWJAHw4",
    authDomain: "forms-beeee.firebaseapp.com",
    projectId: "forms-beeee",
    storageBucket: "forms-beeee.appspot.com",
    messagingSenderId: "637029528424",
    appId: "1:637029528424:web:ec5044642300cc39da9cdd",
    measurementId: "G-Y83T3ZLFWY"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

function submitForm() {
    var push_to_firebase = function (data) {

        db.collection("forms").add({
            fname: data["fname"],
            lname: data["lname"],
            course: data["course"],
            artifact: data["artifact"],
            room: data["room"],
            station: data["station"],
            date: data["date"],
            time: data["time"],
            timestamp: Date.now()
        })
            .then(function (docRef) {
                console.log("Form sent, ID: ", docRef.id);
                location.reload();
                alert("Request Submitted.");
            })
            .catch(function (error) {
                console.error("Form could not be sent: ", error);
            });
    }

    var form_submit = function () {
        var fname = document.getElementById("fname");
        var lname = document.getElementById("lname");
        var course = document.getElementById("course");
        var artifact = document.getElementById("artifact");
        var room = document.getElementById("room");
        var station = document.getElementById("station");
        var date = document.querySelector('input[name="date"]:checked');
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

    document.getElementById("submit_msg").addEventListener("click", form_submit);
}

async function exportToCSV() {
    const formsRef = db.collection('forms');
    const snapshot = await formsRef.get();
    var data = []
    snapshot.forEach(doc => {
        data.push(doc.data());
    });

    var csv = ""

    for (let i = 0; i < data.length; i++) {
        csv += JSON.stringify(data[i].artifact) + "," + JSON.stringify(data[i].course) + "," + JSON.stringify(data[i].date) + "," + JSON.stringify(data[i].fname)
            + "," + JSON.stringify(data[i].lname) + "," + JSON.stringify(data[i].room) + "," + JSON.stringify(data[i].station) + "," + JSON.stringify(data[i].time)
            + "," + JSON.stringify(data[i].timestamp) + "\n"
    }

    console.log(csv)
}