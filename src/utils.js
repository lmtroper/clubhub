import { toast } from 'react-toastify'; 
import "react-toastify/dist/ReactToastify.css";

export const indigo = "#3f51b5";
export const deepOrange = "rgb(255, 87, 34)";
export const lightGreen = "#8bc34a";
export const red = "#f44336";
export const deepPurple = "rgb(103, 58, 183)";
export const teal = "#009688";

export const timestamp = () => {
    let today = new Date();
    const leadingZero = (n) => {
        if (n.toString.length === 1){
            n = '0' + n;
            return n;
        }
        return n;
    }
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+leadingZero(today.getHours())+':'+leadingZero(today.getMinutes())+':'+today.getSeconds();
    return date;
}

export function intersectArrays(array1, array2) {
    return array1.filter(value => array2.includes(value));
}

export function unionArrays(array1, array2) {
    const combinedArray = [...array1, ...array2];
    const uniqueArray = Array.from(new Set(combinedArray));
    return uniqueArray;
}

export function textTruncate(input) {
    if (input.length > 100) {
        return input.substring(0, 200) + '...';
    }
    return input;
};

export const toastNotification = (msg) => {
    toast.configure();
    toast.success({msg}, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: true
    });
}

export const datetimeTextFormat = () => {
    const weekdays = {
        Mon: 'Mon',
        Tue: 'Tues',
        Wed: 'Wed',
        Thu: 'Thurs',
        Fri: 'Fri',
        Sat: 'Sat',
        Sun: 'Sun'
    }

    const months = {
        Jan: 'January',
        Feb: 'February',
        Mar: 'March',
        Apr: 'April',
        May: 'May',
        Jun: 'June',
        Jul: 'July',
        Aug: 'August',
        Sep: 'September',
        Oct: 'October',
        Nov: 'November',
        Dec: 'December'
    }

    let d = Date().toString();
    d = d.split(' ')
    return weekdays[d[0]] + ' ' + months[d[1]] + ' ' + d[2] + ' ' + d[3] + ' ' + convertTime(d[4].slice(0, 5))
}

export function convertTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
}
