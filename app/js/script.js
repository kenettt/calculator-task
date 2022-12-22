  const $employerCompensatonDays = document.querySelector(".employer__days");
  const $employerCompensationTotalAmount = document.querySelector(".employer__total");
  const $dailyAllowance = document.querySelectorAll(".daily__allowance__amount");
  const $incurenceCompensationDays = document.querySelector(".health__days");
  const $incuranceCompensationTotalAmount = document.querySelector(".health__total");
  const $totalAmount = document.querySelector(".total__amount");

  function updateUI() {
    $employerCompensatonDays.innerText = state.employerCompensatonDays + " days";
    $incurenceCompensationDays.innerText = state.incurenceCompensationDays + " days";
    $dailyAllowance.forEach(allowance => allowance.innerHTML = state.dailyAllowance + " €")
    $employerCompensationTotalAmount.innerText = state.employerCompensationTotalAmount + "€";
    $incuranceCompensationTotalAmount.innerText = state.incuranceCompensationTotalAmount + "€";
    $totalAmount.innerText = ((state.employerCompensatonDays + state.incurenceCompensationDays) * state.dailyAllowance).toFixed(2) + "€";
  }
  
  const state = {
    employerCompensatonDays: 0,
    incurenceCompensationDays:0,
    dailyAllowance:0,
    employerCompensationTotalAmount:0,
    incuranceCompensationTotalAmount:0
  }

  const paymentSicknessData = {
    avarageDaysOfMonth:28,
    employOwnRespons:3,
    employerMaxCompDays:8,
    compensationRate:70,
    maxIncurenceEventNoTuberculosis:182,
    maxIncurenceEventWithTuberculosis:240
  }
  
  function calculateEmployerCompensationDays(daysOfSick) {

    switch (true) {
      case (daysOfSick <= paymentSicknessData.employOwnRespons):
        state.employerCompensatonDays = 0 
        break;
      case (daysOfSick > paymentSicknessData.employerMaxCompDays):
        state.employerCompensatonDays = paymentSicknessData.employerMaxCompDays - paymentSicknessData.employOwnRespons
        break;  
      default:
        state.employerCompensatonDays = daysOfSick - paymentSicknessData.employOwnRespons
        break;
    }
    
  }
  
  function calculateIncurenceCompensationDays(daysOfSick,tubercolosis) {
  
    if(tubercolosis) {
      switch (true) {
        case (daysOfSick > paymentSicknessData.employerMaxCompDays && daysOfSick < paymentSicknessData.maxIncurenceEventWithTuberculosis + paymentSicknessData.employerMaxCompDays):
          state.incurenceCompensationDays = daysOfSick - paymentSicknessData.employerMaxCompDays
          break;
        case (daysOfSick > paymentSicknessData.employerMaxCompDays && daysOfSick >= paymentSicknessData.maxIncurenceEventWithTuberculosis + paymentSicknessData.employerMaxCompDays):
          state.incurenceCompensationDays = paymentSicknessData.maxIncurenceEventWithTuberculosis 
          break;   
        default:
          state.incurenceCompensationDays = 0
          break;
      }
    }
  
    if(!tubercolosis) {
      switch (true) {
        case (daysOfSick > paymentSicknessData.employerMaxCompDays && daysOfSick < paymentSicknessData.maxIncurenceEventNoTuberculosis + paymentSicknessData.employerMaxCompDays):
          state.incurenceCompensationDays = daysOfSick - paymentSicknessData.employerMaxCompDays
          break;
        case (daysOfSick > paymentSicknessData.employerMaxCompDays && daysOfSick >= paymentSicknessData.maxIncurenceEventNoTuberculosis + paymentSicknessData.employerMaxCompDays):
          state.incurenceCompensationDays = paymentSicknessData.maxIncurenceEventNoTuberculosis 
          break;   
        default:
          state.incurenceCompensationDays = 0
          break;
      }
    }
   
  }
  
function calculate(e) {
  
  e.preventDefault();
  
  const income = e.target.income.value
  const daysOfSick = e.target.daysOfSick.value
  const tubercolosis = e.target.tubercolosis.checked

  calculateEmployerCompensationDays(daysOfSick)
  calculateIncurenceCompensationDays(daysOfSick,tubercolosis)
  
  state.dailyAllowance = ((income * paymentSicknessData.compensationRate / 100) / paymentSicknessData.avarageDaysOfMonth).toFixed(2)
  state.employerCompensationTotalAmount = (state.dailyAllowance * state.employerCompensatonDays).toFixed(2)
  state.incuranceCompensationTotalAmount = (state.dailyAllowance * state.incurenceCompensationDays).toFixed(2)

  updateUI()
}





