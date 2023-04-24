import { useEffect, useState } from "react";
import { resetAllScoreOfUsers } from "../utils/firebaseRealtime";

function NextTimerScore() {
  const [countDown, setCountDown] = useState();
  const [countDownTitle, setCountDownTitle] = useState();

  const [weekNumber, setWeekNumber] = useState(0);

  const [serverDate, setServerDate] = useState("");

  useEffect(() => {
    fetch("https://worldtimeapi.org/api/timezone/Europe/Rome").then(
      (response) => {
        response.json().then((data) => {
          setServerDate(data);
        });
      }
    );
  }, []);

  useEffect(() => {
    const today = new Date();
    const nextMonday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + ((7 - today.getDay()) % 7)
    );

    let interval = setInterval(function() {
      console.debug("");
      console.debug("===== CLIENT SIDE ====");
      let now = new Date();
      // now -> server date
      let timeUntilMonday = nextMonday.getTime() - now.getTime();

      let days = Math.floor(timeUntilMonday / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (timeUntilMonday % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor(
        (timeUntilMonday % (1000 * 60 * 60)) / (1000 * 60)
      );
      let seconds = Math.floor((timeUntilMonday % (1000 * 60)) / 1000);

      console.debug(
        today.toLocaleDateString("it-IT") +
          " -> " +
          nextMonday.toLocaleDateString("it-IT") +
          " mancano:"
      );
      console.debug(
        days +
          " giorni " +
          hours +
          " ore " +
          minutes +
          " min " +
          seconds +
          " sec"
      );

      if (timeUntilMonday < 0) {
        clearInterval(interval);
        setTimeout(() => {
           console.debug("---- RESET SCORE ----")
           resetAllScoreOfUsers();
        }, 1500);
      }  
      
    } , 1000);

    return () => clearInterval(interval);
  });

  return <></>;
}

export default NextTimerScore;



  /* useEffect(() => {

    let current = new Date();

    let year = new Date(current.getFullYear(), 4, 1);
    let daysOfYear = Math.floor((current - year) / (24 * 60 * 60 * 1000));
    // setWeekNumber((Math.ceil((current.getDay() + daysOfYear) / 7)));

    let countDownDate;
    // let countDownDate = current.setHours(16, 1, 0, 999);
    let lastMinute = 0;
    let dayOfTheWeek = current.getDay(); // 0 dom, 1 lun, 2 mar, 3 mer, 4 gio, 5 ven, 6 sab
    let sunday = 0;

    if (dayOfTheWeek === 0) {
      countDownDate = current.setDate(current.getDate());
    } else {
      countDownDate = current.setDate(current.getDate() + 7);
    }

    let interval = setInterval(function () {
      let now = new Date();
      let days = 7 - now.getDay();
      let hours = 24 - now.getHours() - 1;
      let min = 60 - now.getMinutes() - 1;
      let sec = 60 - now.getSeconds();

      console.log(days + " " + hours + " " + min + " " + sec);
      let timeLeft = countDownDate - now;

      if (timeLeft >= 0) {
        // errr days and hours
        let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
          (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        console.log(days + " " + hours + " " + min + " " + sec);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        const result = days + ":" + hours + ":" + minutes + ":" + seconds;
        setCountDown(result);

        if (lastMinute !== minutes) {
          const resultDetailed =
            days + " giorni " + hours + " ore " + minutes + " minuti ";
          setCountDownTitle(resultDetailed);
          lastMinute = minutes;
        }
      }

         if (timeLeft < 0) {
                clearInterval(interval);
                setTimeout(() => {
                    window.location.reload(true);
                }, 2000);
            }  
    }, 1000);

    return function cleanup() {
      clearInterval(interval);
    };
  }); */