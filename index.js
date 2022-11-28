function createEmployeeRecord(employeeArr) {
    const employeeObj = {
        firstName: employeeArr[0],
        familyName: employeeArr[1],
        title: employeeArr[2],
        payPerHour: employeeArr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeObj;
}

function createEmployeeRecords(array) {
    return array.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(employeeRecord, timeInfo) {
    const date = timeInfo.split(" ")[0];
    const hour = parseInt(timeInfo.split(" ")[1]);
    const dataObj = {
        type: "TimeIn",
        hour: hour,
        date: date
    }
    employeeRecord.timeInEvents.push(dataObj);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, timeInfo) {
    const date = timeInfo.split(" ")[0];
    const hour = parseInt(timeInfo.split(" ")[1]);
    const dataObj = {
        type: "TimeOut",
        hour: hour,
        date: date
    }
    employeeRecord.timeOutEvents.push(dataObj);
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateString) {
    const inEvent = employeeRecord.timeInEvents.find(e => e.date === dateString);
    const outEvent = employeeRecord.timeOutEvents.find(e => e.date === dateString);
    const timeIn = inEvent.hour;
    const timeOut = outEvent.hour;
    return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(employeeRecord, dateString) {
    return hoursWorkedOnDate(employeeRecord, dateString) * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
    const workedDates = employeeRecord.timeInEvents.map(e => e.date);
    const amountOwed = workedDates.reduce((previousValue, day) => {
        return previousValue + wagesEarnedOnDate(employeeRecord, day)
    }, 0);
    return amountOwed;
}

function calculatePayroll(allEmployees) {
    return allEmployees.reduce((previousValue, record) => {
        return previousValue + allWagesFor(record);
    }, 0);
}