$(function () {
    var nowDate = new Date;
    var nowYear = nowDate.getFullYear();
    var nowMonth = nowDate.getMonth() + 1; // +1, because array starts counting from 0

    function loadCalendar() {
        var calendarEl = document.getElementById('calendar');

        var calendar = new FullCalendar.Calendar(calendarEl, {
            plugins: ['interaction', 'dayGrid', 'timeGrid'],
            locale: 'lt',
            header: {
                left: 'prev',
                center: 'title',
                right: 'next'
            },
            height: 1000,
            fixedWeekCount: false,
            showNonCurrentDates: false,
            views: {
                timeGridWeek: {
                    type: 'timeGrid',
                    duration: {
                        days: 1
                    },
                    buttonText: '1 day'
                }
            },
            events: generateEvents(neededSpecialist)
        });

        calendar.render();
    }

    var allClients = Client.getByStatus(1);
    var dates = {};
    var mergedDates = {};
    var neededSpecialist = 1;

    function averageWaitingTimeByDate () {
        for (var i in allClients) {
            var client = allClients[i];
            var specialist = client.specialist;
            var date = new Date(client.registered_at);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hour = date.getHours();

            if (!dates.hasOwnProperty(specialist)) {
                dates[specialist] = {};
            }

            if (!dates[specialist].hasOwnProperty(year)) {
                dates[specialist][year] = {};
                mergedDates[year] = {};
            }

            if (!dates[specialist][year].hasOwnProperty(month)) {
                dates[specialist][year][month] = {};
                mergedDates[year][month] = {};
            }

            if (!dates[specialist][year][month].hasOwnProperty(day)) {
                dates[specialist][year][month][day] = {};
                mergedDates[year][month][day] = {};
            }

            if (!dates[specialist][year][month][day].hasOwnProperty(hour)) {
                dates[specialist][year][month][day][hour] = [];
                mergedDates[year][month][day][hour] = [];
            }

            dates[specialist][year][month][day][hour].push(client.serviced_at - client.registered_at);
            mergedDates[year][month][day][hour].push(client.serviced_at - client.registered_at);
        }
    }

    function mostBusyHours(specialist, year, month, day) {
        var datesList = {};

        if("all" === specialist) {
            datesList = mergedDates;
        } else {
            datesList = dates[specialist];
        }
    
        if(!datesList.hasOwnProperty(year)) {
            return null;
        }
        if (!datesList[year].hasOwnProperty(month)) {
            return null;
        }
        if (!datesList[year][month].hasOwnProperty(day)) {
            return null;
        }
        var hours = datesList[year][month][day];
        var hoursByClientsCount = Object.assign({}, hours);
        var result = [];

        for (var i in hoursByClientsCount) {
            hoursByClientsCount[i] = hoursByClientsCount[i].length;
        }

        for (var i in hoursByClientsCount) {
            result.push({
                hour: i,
                clientsCount: hoursByClientsCount[i]
            });
        }

        result.sort(function (a, b) {
            return b.clientsCount - a.clientsCount;
        });

        return result;
    }

    function mostFreeHour (specialist, year, month, day) {
        var hours = mostBusyHours(specialist, year, month, day);

        if (null === hours) {
            console.log('Nebuvo klientų!');
            return null;
        }

        var hour = hours[0].hour;

        var date = {
            year: year,
            month: month,
            day: day,
            hour: hour
        };

        return date;
    }

    function mostBusyDays (specialist, year, month) {
        var datesList = {};

        if ("all" === specialist) {
            datesList = mergedDates;
        } else {
            datesList = dates[specialist];
        }

        if (!datesList.hasOwnProperty(year)) {
            return null;
        }
        if (!datesList[year].hasOwnProperty(month)) {
            return null;
        }
        var days = datesList[year][month];
        
        var daysByClientsCount = Object.assign({}, days);
        var result = [];

        for(var i in daysByClientsCount) {
            result.push({
                day: i,
                clientsCount: Object.values(daysByClientsCount[i]).flat().length
            })
        }

        result.sort(function (a, b) {
            return b.clientsCount - a.clientsCount;
        });

        return result;
    }
    
    function mostFreeDay (specialist, year, month) {
        var days = mostBusyDays(specialist, year, month);

        if(null === days) {
            console.log('Nebuvo klientų!');
            return null;
        }
        
        var date = {
            year: year,
            month: month,
            day: days[0].day
        };

        return date;
    }

    function formatEventObject (date, background = false, hour = false) {
        var data = {
            start: {},
            end: {}
        };
        var result = {};

        if (date.hour) {
            data.start.hour = date.hour;
            data.end.hour = parseInt(date.hour);
            if (hour) {
                data.end.hour += 1;
            }

            if (data.end.hour > 23) {
                data.end.hour = 0;
            }
        }
        if (date.day) {
            data.start.day = date.day;
            data.end.day = parseInt(date.day);
            if(!hour) {
                data.end.day += 1;
            }

            var totalDaysInMonth = new Date(date.year, date.month, 0).getDate();

            if (data.end.day > totalDaysInMonth) {
                data.end.day = 1;
            }
        }
        if (date.month) {
            data.start.month = date.month;
            if(!data.end.hasOwnProperty('month')) {
                data.end.month = date.month;
            }

            if (data.end.month > 12) {
                data.end.month = 1;
                data.end.year = parseInt(date.year) + 1;
            }
        }
        if (date.year) {
            data.start.year = date.year;
            data.end.year = date.year;
        }

        if(background) {
            result.rendering = "background"
        }

        function sliceDate(val) { return ("0" + val).slice(-2); }

        var startDate = data.start.year + '-' + sliceDate(data.start.month) + '-' + sliceDate(data.start.day);
        if(data.start.hour) {
            startDate += ' ' + sliceDate(data.start.hour) + ':00';
        }

        var endDate = data.end.year + '-' + sliceDate(data.end.month) + '-' + sliceDate(data.end.day);
        if (data.end.hour) {
            endDate += ' ' + sliceDate(data.end.hour) + ':00';
        }

        result.title = "h laisviausia valanda";
        result.start = startDate;
        result.end = endDate;

        return result;
    }

    function generateEvents (specialist) {
        var results = [];
        for(var year in mergedDates) {
            for (var month in mergedDates[year]) {
                var mostFreeDayObject = mostFreeDay(specialist, year, month);
                results.push(formatEventObject(mostFreeDayObject, true));
                var mostFreeHourObject = mostFreeHour(specialist, year, month, mostFreeDayObject.day);
                results.push(formatEventObject(mostFreeHourObject, false, true));
            }
        }
        return results;
    }

    averageWaitingTimeByDate();
   // mostBusyDays(neededSpecialist, 2019, 9);
    //mostBusyHours(neededSpecialist, 2019, 9, 23);
loadCalendar();
});