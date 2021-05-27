function createEmployeeRecord(employee) {
    let newEmployeeObject = {};
    newEmployeeObject.firstName = employee[0];
    newEmployeeObject.familyName = employee[1];
    newEmployeeObject.title = employee[2];
    newEmployeeObject.payPerHour = employee[3];
    newEmployeeObject.timeInEvents = [];
    newEmployeeObject.timeOutEvents = [];

    return newEmployeeObject;
}

function createEmployeeRecords(employees) {
    return employees.map(employee => createEmployeeRecord(employee));
}

// Removed employee as a parameter, as it will be added back in when
// using the .call() method
// Inside the function, replaced 'employee' with 'this', as
// the context (employee) is set when invoking the function and using the .call() method
// (So that 'this' = 'employee')

function createTimeInEvent(timeStamp) {
    const splitTimeStamp = timeStamp.split(' ');
    const date = splitTimeStamp[0];
    const hour = parseInt(splitTimeStamp[1], 10);

    const newTimeInEvent = {};
    newTimeInEvent.type = 'TimeIn';
    newTimeInEvent.date = date;
    newTimeInEvent.hour = hour;
    this.timeInEvents.push(newTimeInEvent);

    return this;
}

let meganRecord = createEmployeeRecord(['Megan', 'McCarty', 'Software Engineer', '35']);
console.log(createTimeInEvent.call(meganRecord, '2021-05-27 0800'));

function createTimeOutEvent(timeStamp) {
    const splitTimeStamp = timeStamp.split(' ');
    const date = splitTimeStamp[0];
    const hour = parseInt(splitTimeStamp[1], 10);

    const newTimeOutEvent = {};
    newTimeOutEvent.type = 'TimeOut';
    newTimeOutEvent.date = date;
    newTimeOutEvent.hour = hour;
    this.timeOutEvents.push(newTimeOutEvent);

    return this;
}

console.log(createTimeOutEvent.call(meganRecord, '2021-05-27 1700'));

function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(event => event.date === date );
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;

    return hoursWorked
}

console.log(hoursWorkedOnDate.call(meganRecord, '2021-05-27'));

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

console.log(wagesEarnedOnDate.call(meganRecord, '2021-05-27'));

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

console.log(allWagesFor.call(meganRecord));

function calculatePayroll(employees) {
    const payroll = employees.reduce((accumulator, employee) => {
        return accumulator + allWagesFor.call(employee);
    }, 0);
    return payroll;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}