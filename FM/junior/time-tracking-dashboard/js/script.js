const controls = document.querySelectorAll('.control__position');
const data = document.querySelectorAll('span[data-tabs-field]');

for (let control of controls) {
  control.addEventListener('click', () => {
    if (!control.classList.contains('control__position--active')) {
      controls.forEach(item => item.classList.remove('control__position--active'));
      control.classList.add('control__position--active');
      const selected = control.dataset.tabsHandler;
      data.forEach(elem => {
        if (elem.dataset.tabsField === selected) {
          elem.parentNode.hidden = false;
        } else {
          elem.parentNode.hidden = true;
        };
      });
    }
  })
};

const titles = document.querySelectorAll('.data__title');

const fillData = (array) => {
  titles.forEach(card => {
    const section = card.textContent;
    const data = card.parentNode;
    const blankDayCurrent = data.querySelector('.data__current>span[data-tabs-field="day"]');
    const blankDayPrev = data.querySelector('.data__prev>span[data-tabs-field="day"]');
    const blankWeekCurrent = data.querySelector('.data__current>span[data-tabs-field="week"]');
    const blankWeekPrev = data.querySelector('.data__prev>span[data-tabs-field="week"]');
    const blankMonthCurrent = data.querySelector('.data__current>span[data-tabs-field="month"]');
    const blankMonthPrev = data.querySelector('.data__prev>span[data-tabs-field="month"]');

    for (let item of array) {
      if (item.title === section) {
        const {
          timeframes: {
            daily: {
              current: dayCurrent,
              previous: dayPrev
            },
            monthly: {
              current: monthCurrent,
              previous: monthPrev
            },
            weekly: {
              current: weekCurrent,
              previous: weekPrev
            }
          }
        } = item;

        blankDayCurrent.textContent = dayCurrent;
        blankDayPrev.textContent = dayPrev;
        blankMonthCurrent.textContent = monthCurrent;
        blankMonthPrev.textContent = monthPrev;
        blankWeekCurrent.textContent = weekCurrent;
        blankWeekPrev.textContent = weekPrev;
        break;
      };
    };
  });
};

fetch('data.json')
.then((response) => response.json())
.then((data) => fillData(data))
.catch((error) => console.log(`New error - ${error}`));