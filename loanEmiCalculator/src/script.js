const monthlyEmiDisplay = document.getElementById("emiResult");
const principalAmountDisplay = document.getElementById("principalAmount");
const totalInterestDisplay = document.getElementById("totalInterest");
const totalAmountDisplay = document.getElementById("totalAmount");

const loanAmountInput = document.getElementById("loanAmount");
const interestRateInput = document.getElementById("interestRate");
const loanTenureInput = document.getElementById("loanTenure");

const syncInputWithSlider = (inputId, sliderId) => {
  const input = document.getElementById(inputId);
  const slider = document.getElementById(sliderId);

  slider.addEventListener("input", (e) => {
    input.value = e.target.value;
    calculateEmi();
  });

  input.addEventListener("input", (e) => {
    slider.value = e.target.value;
    calculateEmi();
  });
};

syncInputWithSlider("loanAmount", "loanAmountSlider");
syncInputWithSlider("interestRate", "interestRateSlider");
syncInputWithSlider("loanTenure", "loanTenureSlider");

const calculateEmi = () => {
  let P = parseFloat(loanAmountInput.value);
  let annualRate = parseFloat(interestRateInput.value);
  let years = parseInt(loanTenureInput.value);

  if (isNaN(P) || P <= 0) {
    P = 0;
  }
  if (isNaN(annualRate) || annualRate < 0) {
    annualRate = 0;
  }
  if (isNaN(years) || years <= 0) {
    years = 0;
  }

  if (P === 0 || years === 0) {
    monthlyEmiDisplay.textContent = "0.00";
    principalAmountDisplay.textContent = "0.00";
    totalInterestDisplay.textContent = "0.00";
    totalAmountDisplay.textContent = "0.00";
    return;
  }

  let n = years * 12;
  let r = annualRate / 100 / 12; // Monthly interest rate
  let EMI;

  if (r > 0) {
    EMI = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  } else {
    EMI = P / n; // Handling zero interest case
  }

  let totalAmount = EMI * n;
  let totalInterest = totalAmount - P;

  monthlyEmiDisplay.textContent = EMI.toFixed(2);
  principalAmountDisplay.textContent = P.toFixed(2);
  totalInterestDisplay.textContent = totalInterest.toFixed(2);
  totalAmountDisplay.textContent = totalAmount.toFixed(2);
};
