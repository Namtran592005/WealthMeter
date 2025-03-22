import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import './styles.css';
import WealthMeterLogo from './wealthmeter-logo.png';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const translations = {
     en: {
        headerTitle: "WealthMeter",
        basicInfo: "Basic Information",
        assetsDebt: "Assets & Debt",
        savingsInvestment: "Savings & Investment",
        insurance: "Insurance",
        income: "Monthly Income",
        expenses: "Monthly Expenses",
        region: "Region",
        dependents: "Dependents",
        totalAssets: "Total Assets",
        totalDebt: "Total Debt",
        hasSavings: "Have Bank Savings",
        savingsAmount: "Savings Amount",
        interestRate: "Interest Rate (%/period)",
        savingsPeriod: "Period",
        savingsDuration: "Duration",
        hasInvestment: "Have Investments",
        investmentAmount: "Investment Amount",
        expectedReturn: "Expected Return (%/period)",
        investmentPeriod: "Period",
        investmentDuration: "Duration",
        hasInsurance: "Have Life Insurance",
        insurancePremium: "Insurance Premium",
        insurancePeriod: "Period",
        insuranceDuration: "Duration",
        insuranceValue: "Protection Value",
        calculate: "Calculate",
        results: "Results",
        wealthLevel: "Wealth Level",
        wealthIndex: "Wealth Index",
    timeWealthIndex: "Time Wealth Index", // Added
        wealthPercentile: "Wealth Percentile (Lower is better)",
        report: "Detailed Report",
        inputInfo: "Input Information",
        calculations: "Calculations",
        evaluation: "Evaluation",
        disposableIncome: "Disposable Income",
        netWorth: "Net Worth (estimated over 1 year)",
        currency: "Currency",
        language: "Language",
        day: "Day(s)",
        month: "Month(s)",
        year: "Year(s)",
        no: "No",
        regions: {
            hcm: "HCMC/Hanoi",
            danang: "Da Nang",
            other: "Other Province",
        },
      wealthLevels: {
          veryPoor: "Very Poor",
          poor: "Poor",
          nearPoor: "Near Poor",
          lowerMiddle: "Lower Middle",
          middle: "Middle",
          upperMiddle: "Upper Middle",
          wellOff: "Well-off",
          rich: "Rich",
          veryRich: "Very Rich",
          extremelyRich: "Extremely Rich",
        },
      reportInput:{
          'Thu nhập': "Income",
          'Chi phí':"Expense",
          'Khu vực':"Region",
          'Số người phụ thuộc':"Number of Dependents",
          'Tài sản':"Asset",
          'Nợ':"Debt",
      },
      reportCalc:{
          'Thu nhập khả dụng':"Available Income",
          'Tài sản ròng (ước tính 1 năm)':"Net assets (estimated 1 year)",
          'Wealth Index': "Wealth Index",
      },
      reportEval:{
            'Mức độ giàu có':"Level of wealth",
            'Độ giàu có so với dân số (ước tính)':"Wealth compared to the population (estimated)",
        },
        darkMode: "Dark Mode",
        debtRate: "Debt Rate",
        total: "Total",
        reset: "Reset",
        workHours: "Work Hours (per day)",
        freeHours: "Free Hours (per day)",
        workDaysYear: "Work Days (per year)",
        holidaysYear: "Holidays (per year)",
        workDaysWeek: "Work Days (per week)",
        daysOffWeek: "Days Off (per week)",
        timeWealthLevels: { //add time wealth levels
            veryTimePoor: "Very Time Poor",
            timePoor: "Time Poor",
            moderatelyTimePoor: "Moderately Time Poor",
            timeNeutral: "Time Neutral",
            moderatelyTimeRich: "Moderately Time Rich",
            timeRich: "Time Rich",
            veryTimeRich: "Very Time Rich",
        },
    },
    vi: { //tranlations for VN
      headerTitle: "WealthMeter",
        basicInfo: "Thông tin cơ bản",
        assetsDebt: "Tài sản & Nợ",
        savingsInvestment: "Tiền gửi & Đầu tư",
        insurance: "Bảo hiểm",
        income: "Thu nhập hàng tháng",
        expenses: "Chi phí sinh hoạt",
        region: "Khu vực",
        dependents: "Số người phụ thuộc",
        totalAssets: "Tổng tài sản",
        totalDebt: "Tổng nợ",
        hasSavings: "Có tiền gửi ngân hàng",
        savingsAmount: "Số tiền gửi",
        interestRate: "Lãi suất (%/kỳ)",
        savingsPeriod: "Kỳ hạn",
        savingsDuration: "Thời gian",
        hasInvestment: "Có khoản đầu tư",
        investmentAmount: "Giá trị đầu tư",
        expectedReturn: "Lợi nhuận kỳ vọng (%/kỳ)",
        investmentPeriod: "Kỳ hạn",
        investmentDuration: "Thời gian",
        hasInsurance: "Có bảo hiểm nhân thọ",
        insurancePremium: "Phí bảo hiểm",
        insurancePeriod: "Kỳ hạn",
        insuranceDuration: "Thời gian",
        insuranceValue: "Giá trị bảo vệ",
        calculate: "Tính Toán",
        results: "Kết quả",
        wealthLevel: "Mức độ giàu có",
        wealthIndex: "Wealth Index",
      timeWealthIndex: "Chỉ số Giàu có Thời gian", // Added
        wealthPercentile: "Độ giàu có (Càng ít càng tốt)",
        report: "Báo cáo chi tiết",
        inputInfo: "Thông tin đầu vào",
        calculations: "Tính toán",
        evaluation: "Đánh giá",
        disposableIncome: "Thu nhập khả dụng",
        netWorth: "Tài sản ròng (ước tính 1 năm)",
        currency: "Tiền tệ",
        language: "Ngôn ngữ",
        day: "Ngày",
        month: "Tháng",
        year: "Năm",
        no: "Không",
        regions: {
            hcm: "Tp.Hồ Chí Minh/ Hà Nội",
            danang: "Đà Nẵng",
            other: "Tỉnh Khác",
        },
        wealthLevels: {
            veryPoor: "Rất nghèo",
            poor: "Nghèo",
            nearPoor: "Gần nghèo",
            lowerMiddle: "Trung bình thấp",
            middle: "Trung bình",
            upperMiddle: "Trung bình cao",
            wellOff: "Khá giả",
            rich: "Giàu",
            veryRich: "Rất giàu",
            extremelyRich: "Cực kỳ giàu",
        },
        reportInput: {
            'Thu nhập': 'Thu nhập',
            'Chi phí': 'Chi phí',
            'Khu vực': 'Khu vực',
            'Số người phụ thuộc': 'Số người phụ thuộc',
            'Tài sản': 'Tài sản',
            'Nợ': 'Nợ',

        },
        reportCalc: {
            'Thu nhập khả dụng': 'Thu nhập khả dụng',
            'Tài sản ròng (ước tính 1 năm)': 'Tài sản ròng (ước tính 1 năm)',
            'Wealth Index': "Wealth Index",
        },
        reportEval: {
            'Mức độ giàu có': "Mức độ giàu có",
            'Độ giàu có so với dân số (ước tính)': "Độ giàu có so với dân số (ước tính)",
        },
        darkMode: "Chế độ tối",
        debtRate: "Lãi Suất Nợ",
        total: "Tổng cộng",
        reset: "Xóa tất cả", //add reset in VN
        workHours:  "Số giờ làm việc (mỗi ngày)",
        freeHours:  "Số giờ rãnh rỗi (mỗi ngày)",
        workDaysYear:  "Số ngày làm việc (mỗi năm)",
        holidaysYear: "Số ngày nghỉ (mỗi năm)",
        workDaysWeek:  "Số ngày làm trong tuần",
        daysOffWeek: "Số ngày nghỉ trong tuần",
       timeWealthLevels: {  //add time wealth levels for VN
            veryTimePoor: "Rất nghèo thời gian",
            timePoor: "Nghèo thời gian",
            moderatelyTimePoor: "Hơi nghèo thời gian",
            timeNeutral: "Trung bình thời gian",
            moderatelyTimeRich: "Hơi giàu thời gian",
            timeRich: "Giàu thời gian",
            veryTimeRich: "Rất giàu thời gian",
        },
    },

    // Add similar translations for 'ja' and 'ko' as needed.  I'll omit them here for brevity,
    // but follow the same pattern as 'en' and 'vi', translating all new strings.
     ja: { //translate JA
        headerTitle: "WealthMeter",
        basicInfo: "基本情報",
        assetsDebt: "資産と負債",
        savingsInvestment: "貯蓄と投資",
        insurance: "保険",
        income: "月収",
        expenses: "月々の支出",
        region: "地域",
        dependents: "扶養家族数",
        totalAssets: "総資産",
        totalDebt: "総負債",
        hasSavings: "銀行預金がありますか",
        savingsAmount: "貯蓄額",
        interestRate: "金利 (%/期間)",
        savingsPeriod: "期間",
        savingsDuration: "期間",
        hasInvestment: "投資がありますか",
        investmentAmount: "投資額",
        expectedReturn: "期待収益率 (%/期間)",
        investmentPeriod: "期間",
        investmentDuration: "期間",
        hasInsurance: "生命保険がありますか",
        insurancePremium: "保険料",
        insurancePeriod:"期間",
        insuranceDuration:"期間",
        insuranceValue: "保障額",
        calculate: "計算",
        results: "結果",
        wealthLevel: "富裕度",
        wealthIndex: "ウェルス指数",
      timeWealthIndex: "時間的豊かさ指数",//add
        wealthPercentile: "富裕度 (低いほど良い)",
        report: "詳細レポート",
        inputInfo: "入力情報",
        calculations: "計算",
        evaluation: "評価",
        disposableIncome: "可処分所得",
        netWorth: "純資産 (1年間の推定)",
        currency: "通貨",
        language: "言語",
        day: "日",
        month: "月",
        year: "年",
        no: "いいえ",
     regions: {
            hcm: "ホーチミン/ハノイ",
            danang: "ダナン",
            other: "その他地域",
        },
         wealthLevels: {
          veryPoor: "非常に貧しい",
          poor: "貧しい",
          nearPoor: "貧困に近い",
          lowerMiddle: "中低所得層",
          middle: "中所得層",
          upperMiddle: "中高所得層",
          wellOff: "裕福層",
          rich: "富裕層",
          veryRich: "大富豪",
          extremelyRich: "超富裕層",
        },
        reportInput:{
          'Thu nhập': "収入",
          'Chi phí':"費用",
          'Khu vực':"領域",
          'Số người phụ thuộc':"扶養家族数",
          'Tài sản':"財産",
          'Nợ':"借金",
      },
      reportCalc:{
          'Thu nhập khả dụng':"利用可能な収入",
          'Tài sản ròng (ước tính 1 năm)':"純資産 (1 年推定)",
           'Wealth Index':"ウェルス指数",
        },
       reportEval:{
            'Mức độ giàu có':"富裕度",
            'Độ giàu có so với dân số (ước tính)':"人口に占める富裕度（推定）",
        },
        darkMode: "ダークモード",
        debtRate:"負債金利",
        total: "合計",
        reset: "リセット",
         workHours: "労働時間 (1日あたり)",
        freeHours: "自由時間 (1日あたり)",
        workDaysYear: "年間労働日数",
        holidaysYear: "年間休日数",
        workDaysWeek: "週間労働日数",
        daysOffWeek: "週休",
          timeWealthLevels: {  //add time wealth levels for JA
            veryTimePoor: "時間的貧困層",
            timePoor: "時間貧困層",
            moderatelyTimePoor: "時間的やや貧困層",
            timeNeutral: "時間的中立層",
            moderatelyTimeRich: "時間的やや富裕層",
            timeRich: "時間的富裕層",
            veryTimeRich: "時間的富裕層",
        },
    },
    ko: {//translate KR
        headerTitle: "WealthMeter",
        basicInfo: "기본 정보",
        assetsDebt: "자산 및 부채",
        savingsInvestment: "저축 및 투자",
        insurance: "보험",
        income: "월 소득",
        expenses: "월 지출",
        region: "지역",
        dependents: "부양 가족 수",
        totalAssets: "총 자산",
        totalDebt: "총 부채",
        hasSavings: "은행 저축이 있습니까",
        savingsAmount: "저축액",
        interestRate: "이자율 (%/기간)",
        savingsPeriod: "기간",
        savingsDuration: "기간",
        hasInvestment: "투자가 있습니까",
        investmentAmount: "투자액",
        expectedReturn: "기대 수익률 (%/기간)",
        investmentPeriod: "기간",
        investmentDuration: "기간",
        hasInsurance: "생명 보험이 있습니까",
        insurancePremium: "보험료",
        insurancePeriod:"기간",
        insuranceDuration: "기간",
        insuranceValue: "보장 금액",
        calculate: "계산",
        results: "결과",
        wealthLevel: "부의 수준",
        wealthIndex: "웰스 인덱스",
      timeWealthIndex: "시간 부 지수", //add
        wealthPercentile: "부의 백분위수 (낮을수록 좋음)",
        report: "상세 보고서",
        inputInfo: "입력 정보",
        calculations: "계산",
        evaluation: "평가",
        disposableIncome: "가처분 소득",
        netWorth: "순자산 (1년 추정)",
        currency: "통화",
        language: "언어",
        day: "일",
        month: "월",
        year: "년",
        no: "아니오",
         regions: {
            hcm: "호치민/하노이",
            danang: "다낭",
            other: "기타 지역",
        },
         wealthLevels: {
          veryPoor: "매우 가난함",
          poor: "가난함",
          nearPoor: "빈곤에 가까움",
          lowerMiddle: "중하 소득층",
          middle: "중산층",
          upperMiddle: "중상 소득층",
          wellOff: "부유층",
          rich: "부자",
          veryRich: "매우 부자",
          extremelyRich: "극도로 부자",
        },
      reportInput:{
          'Thu nhập': "수입",
          'Chi phí':"비용",
          'Khu vực':"지역",
          'Số người phụ thuộc':"부양가족 수",
          'Tài sản':"자산",
          'Nợ':"부채",
      },
       reportCalc:{
          'Thu nhập khả dụng':"가용 소득",
          'Tài sản ròng (ước tính 1 năm)':"순자산(1년 추정)",
          'Wealth Index': "웰스 인덱스",
        },
        reportEval:{
            'Mức độ giàu có':"부의 수준",
            'Độ giàu có so với dân số (ước tính)':"인구 대비 부의 정도(추정)",
        },
        darkMode: "다크 모드",
        debtRate: "부채 금리",
        total: "총",
        reset: "초기화", //added translate
         workHours: "근무 시간(일일)",
        freeHours: "여가 시간(일일)",
        workDaysYear: "연간 근무 일수",
        holidaysYear: "연간 휴일 수",
        workDaysWeek: "주당 근무 일수",
        daysOffWeek: "주당 휴무일 수",
        timeWealthLevels: {
            veryTimePoor: "시간 매우 부족",
            timePoor: "시간 부족",
            moderatelyTimePoor: "시간 조금 부족",
            timeNeutral: "시간 중립",
            moderatelyTimeRich: "시간 조금 부유",
            timeRich: "시간 부유",
            veryTimeRich: "시간 매우 부유",
        },

    },
};

function Header({ language, setLanguage, isDarkMode, toggleDarkMode }) {
    const t = translations[language];
    return (
        <header className={isDarkMode ? 'dark-mode' : ''}>
            <div className="header-content">
                <img src={WealthMeterLogo} alt="WealthMeter Logo" className="logo" />
                {/* Improved Title Styling */}
                <span className="header-title">{t.headerTitle}</span>
                <div className="header-controls">
                    <select className="language-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
                        <option value="en">EN</option>
                        <option value="vi">VN</option>
                        <option value="ja">JP</option>
                        <option value="ko">KR</option>
                    </select>
                    <button className="dark-mode-toggle" onClick={toggleDarkMode}>
                       {isDarkMode ? '☀️' : '🌙'} {t.darkMode}
                    </button>
                </div>
            </div>
        </header>
    );
}

function Form({ onCalculate, language, currency, setCurrency }) {
    const t = translations[language];
    const [income, setIncome] = useState('');
    const [expenses, setExpenses] = useState('');
    const [region, setRegion] = useState('hcm');
    const [dependents, setDependents] = useState('');
    const [assets, setAssets] = useState('');
    const [debt, setDebt] = useState('');
    const [debtRate, setDebtRate] = useState('5');
    const [hasSavings, setHasSavings] = useState(false);
    const [savings, setSavings] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [savingsPeriod, setSavingsPeriod] = useState('month');
    const [savingsDuration, setSavingsDuration] = useState('');
    const [hasInvestment, setHasInvestment] = useState(false);
    const [investment, setInvestment] = useState('');
    const [expectedReturn, setExpectedReturn] = useState('');
    const [investmentPeriod, setInvestmentPeriod] = useState('month');
    const [investmentDuration, setInvestmentDuration] = useState('');
    const [hasInsurance, setHasInsurance] = useState(false);
    const [insurancePremium, setInsurancePremium] = useState('');
    const [insurancePeriod, setInsurancePeriod] = useState('month');
    const [insuranceDuration, setInsuranceDuration] = useState('');
    const [insuranceValue, setInsuranceValue] = useState('');
     // Time-related state variables
    const [workHours, setWorkHours] = useState('');
    const [freeHours, setFreeHours] = useState('');
    const [workDaysYear, setWorkDaysYear] = useState('');
    const [holidaysYear, setHolidaysYear] = useState('');
    const [workDaysWeek, setWorkDaysWeek] = useState(''); // New state
    const [daysOffWeek, setDaysOffWeek] = useState('');   // New state
    const [isAccordionOpen, setIsAccordionOpen] = useState({
        basic: true,
        assets: false,
        finance: false,
        insurance: false,
        time: false, // Accordion for time
    });

    const [errors, setErrors] = useState({});

    const validateRequired = (value, fieldName) => {
        if (!value) {
            setErrors(prevErrors => ({ ...prevErrors, [fieldName]: "This field is required." }));
            return false;
        }
        return true;
    };

    const validateNumber = (value, fieldName) => {
        if (isNaN(parseFloat(value.replace(/\./g, '')))) {
            setErrors(prevErrors => ({ ...prevErrors, [fieldName]: "Invalid number format." }));
            return false;
        }
        return true;
    };

    const clearError = (fieldName) => {
        setErrors(prevErrors => ({ ...prevErrors, [fieldName]: '' }));
    };

    const toggleAccordion = (section) => {
        setIsAccordionOpen((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const formatNumber = (value) => {
        if (value === '') return '';
        const num = parseFloat(value.replace(/\./g, ''));
        if (isNaN(num)) return '';
        return num.toLocaleString('de-DE');
    };

    const handleInputChange = (setter, fieldName, isRequired = false, isNumber = false) => (e) => {
        const value = e.target.value;
        if (isNumber) {
            setter(formatNumber(value));
        } else {
            setter(value);
        }
        clearError(fieldName);
        if (isRequired) {
            validateRequired(value, fieldName);
        }
        if (isNumber) {
            validateNumber(formatNumber(value), fieldName);
        }
    };

    const handleSelectChange = (setter, fieldName) => (e) => {
        setter(e.target.value);
        clearError(fieldName);
    };

    const handleCheckboxChange = (setter, fieldName) => (e) => {
        const isChecked = e.target.checked;
        setter(isChecked);
        if (!isChecked) {
            switch (fieldName) {
                case 'hasSavings':
                    setSavings('');
                    setInterestRate('');
                    setSavingsDuration('');
                    clearError('savings');
                    clearError('interestRate');
                    clearError('savingsDuration');
                    break;
                case 'hasInvestment':
                    setInvestment('');
                    setExpectedReturn('');
                    setInvestmentDuration('');
                    clearError('investment');
                    clearError('expectedReturn');
                    clearError('investmentDuration');
                    break;
                case 'hasInsurance':
                    setInsurancePremium('');
                    setInsuranceValue('');
                    setInsuranceDuration('');
                    clearError('insurancePremium');
                    clearError('insuranceValue');
                    clearError('insuranceDuration');
                    break;
                default:
                    break;
            }
        }
        clearError(fieldName);
    };

    const handleReset = () => {
        // Reset all form fields
        setIncome('');
        setExpenses('');
        setRegion('hcm');
        setDependents('');
        setAssets('');
        setDebt('');
        setDebtRate('5');
        setHasSavings(false);
        setSavings('');
        setInterestRate('');
        setSavingsPeriod('month');
        setSavingsDuration('');
        setHasInvestment(false);
        setInvestment('');
        setExpectedReturn('');
        setInvestmentPeriod('month');
        setInvestmentDuration('');
        setHasInsurance(false);
        setInsurancePremium('');
        setInsurancePeriod('month');
        setInsuranceDuration('');
        setInsuranceValue('');
        setWorkHours('');          // Reset time inputs
        setFreeHours('');
        setWorkDaysYear('');
        setHolidaysYear('');
        setWorkDaysWeek('');
        setDaysOffWeek('');
        setIsAccordionOpen({
            basic: true,
            assets: false,
            finance: false,
            insurance: false,
            time: false, // Reset time accordion
        });
        setErrors({});
        onCalculate(null); // Clear results
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        const parseFormattedNumber = (value) => parseFloat(value.replace(/\./g, '')) || 0;
        let isValid = true;

        if (!validateRequired(income, 'income') || !validateNumber(income, 'income')) isValid = false;
        if (!validateRequired(expenses, 'expenses') || !validateNumber(expenses, 'expenses')) isValid = false;
        if (!validateRequired(dependents, 'dependents')) isValid = false;
        if (!validateRequired(assets, 'assets') || !validateNumber(assets, 'assets')) isValid = false;
        if (!validateRequired(debt, 'debt') || !validateNumber(debt, 'debt')) isValid = false;
        if (!validateRequired(debtRate, 'debtRate') || !validateNumber(debtRate, 'debtRate')) isValid = false;

        // Validate time inputs
        if (!validateRequired(workHours, 'workHours') || !validateNumber(workHours, 'workHours')) isValid = false;
        if (!validateRequired(freeHours, 'freeHours') || !validateNumber(freeHours, 'freeHours')) isValid = false;
        if (!validateRequired(workDaysYear, 'workDaysYear') || !validateNumber(workDaysYear, 'workDaysYear')) isValid = false;
        if (!validateRequired(holidaysYear, 'holidaysYear') || !validateNumber(holidaysYear, 'holidaysYear')) isValid = false;
         if (!validateRequired(workDaysWeek, 'workDaysWeek') || !validateNumber(workDaysWeek, 'workDaysWeek')) isValid = false;
        if (!validateRequired(daysOffWeek, 'daysOffWeek') || !validateNumber(daysOffWeek, 'daysOffWeek')) isValid = false;


        if (hasSavings) {
            if (!validateRequired(savings, 'savings') || !validateNumber(savings, 'savings')) isValid = false;
            if (!validateRequired(interestRate, 'interestRate')) isValid = false;
            if (!validateRequired(savingsDuration, 'savingsDuration') || !validateNumber(savingsDuration, 'savingsDuration')) isValid = false;
        }
        if (hasInvestment) {
            if (!validateRequired(investment, 'investment') || !validateNumber(investment, 'investment')) isValid = false;
            if (!validateRequired(expectedReturn, 'expectedReturn')) isValid = false;
            if (!validateRequired(investmentDuration, 'investmentDuration') || !validateNumber(investmentDuration, 'investmentDuration')) isValid = false;
        }
        if (hasInsurance) {
            if (!validateRequired(insurancePremium, 'insurancePremium') || !validateNumber(insurancePremium, 'insurancePremium')) isValid = false;
            if (!validateRequired(insuranceValue, 'insuranceValue') || !validateNumber(insuranceValue, 'insuranceValue')) isValid = false;
            if (!validateRequired(insuranceDuration, 'insuranceDuration') || !validateNumber(insuranceDuration, 'insuranceDuration')) isValid = false;
        }

        if (!isValid) return;

        onCalculate({
            income: parseFormattedNumber(income),
            expenses: parseFormattedNumber(expenses),
            region,
            dependents: parseInt(dependents),
            assets: parseFormattedNumber(assets),
            debt: parseFormattedNumber(debt),
            debtRate: parseFloat(debtRate),
            hasSavings,
            savings: hasSavings ? parseFormattedNumber(savings) : 0,
            interestRate: hasSavings ? parseFloat(interestRate) : 0,
            savingsPeriod,
            savingsDuration: hasSavings ? parseFloat(savingsDuration) : 0,
            hasInvestment,
            investment: hasInvestment ? parseFormattedNumber(investment) : 0,
            expectedReturn: hasInvestment ? parseFloat(expectedReturn) : 0,
            investmentPeriod,
            investmentDuration: hasInvestment ? parseFloat(investmentDuration) : 0,
            hasInsurance,
            insurancePremium: hasInsurance ? parseFormattedNumber(insurancePremium) : 0,
            insurancePeriod,
            insuranceDuration: hasInsurance ? parseFloat(insuranceDuration) : 0,
            insuranceValue: hasInsurance ? parseFormattedNumber(insuranceValue) : 0,
            currency,
            workHours: parseFloat(workHours),        // Time-related data
            freeHours: parseFloat(freeHours),
            workDaysYear: parseFloat(workDaysYear),
            holidaysYear: parseFloat(holidaysYear),
            workDaysWeek: parseFloat(workDaysWeek),
            daysOffWeek: parseFloat(daysOffWeek)
        });
    };
  return (
        <div className="form-container">
            <div className="form-group currency-group">
                <label htmlFor="currency">{t.currency}:</label>
                <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    <option value="VND">VND</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="JPY">JPY</option>
                    <option value="KRW">KRW</option>
                </select>
            </div>
            <form onSubmit={handleSubmit}>
                {/* Basic Information */}
                <div className="accordion-section">
                    <h3 className="accordion-title" onClick={() => toggleAccordion('basic')}>
                        {t.basicInfo} {isAccordionOpen.basic ? '▲' : '▼'}
                    </h3>
                    {isAccordionOpen.basic && (
                        <div className="accordion-content">
                            <div className="form-group">
                                <label htmlFor="income">{t.income} ({currency}):</label>
                                <input type="text" id="income" value={income} onChange={handleInputChange(setIncome, 'income', true, true)} required />
                                {errors.income && <div className="error-message">{errors.income}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="expenses">{t.expenses} ({currency}):</label>
                                <input type="text" id="expenses" value={expenses} onChange={handleInputChange(setExpenses, 'expenses', true, true)} required />
                                {errors.expenses && <div className="error-message">{errors.expenses}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="region">{t.region}:</label>
                                <select id="region" value={region} onChange={handleSelectChange(setRegion, 'region')}>
                                    <option value="hcm">{t.regions.hcm}</option>
                                    <option value="danang">{t.regions.danang}</option>
                                    <option value="other">{t.regions.other}</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="dependents">{t.dependents}:</label>
                                <input type="number" id="dependents" value={dependents} onChange={handleInputChange(setDependents, 'dependents', true, false)} required />
                                {errors.dependents && <div className="error-message">{errors.dependents}</div>}
                            </div>
                        </div>
                    )}
                </div>

                {/* Assets and Debt */}
                <div className="accordion-section">
                    <h3 className="accordion-title" onClick={() => toggleAccordion('assets')}>
                        {t.assetsDebt} {isAccordionOpen.assets ? '▲' : '▼'}
                    </h3>
                    {isAccordionOpen.assets && (
                        <div className="accordion-content">
                            <div className="form-group">
                                <label htmlFor="assets">{t.totalAssets} ({currency}):</label>
                                <input type="text" id="assets" value={assets} onChange={handleInputChange(setAssets, 'assets', true, true)} required />
                                {errors.assets && <div className="error-message">{errors.assets}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="debt">{t.totalDebt} ({currency}):</label>
                                <input type="text" id="debt" value={debt} onChange={handleInputChange(setDebt, 'debt', true, true)} required />
                                {errors.debt && <div className="error-message">{errors.debt}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="debtRate">{t.debtRate} (%):</label>
                                <input type="text" id="debtRate" value={debtRate} onChange={handleInputChange(setDebtRate, 'debtRate', true, true)} required />
                                {errors.debtRate && <div className="error-message">{errors.debtRate}</div>}
                            </div>
                        </div>
                    )}
                </div>

                {/* Savings and Investment */}
                <div className="accordion-section">
                    <h3 className="accordion-title" onClick={() => toggleAccordion('finance')}>
                        {t.savingsInvestment} {isAccordionOpen.finance ? '▲' : '▼'}
                    </h3>
                    {isAccordionOpen.finance && (
                        <div className="accordion-content">
                            {/* Savings */}
                            <div className="form-group checkbox-group">
                                <label>
                                    <input type="checkbox" checked={hasSavings} onChange={handleCheckboxChange(setHasSavings, 'hasSavings')} />
                                    {t.hasSavings}
                                </label>
                            </div>
                            {hasSavings && (
                                <>
                                    <div className="form-group">
                                        <label htmlFor="savings">{t.savingsAmount} ({currency}):</label>
                                        <input type="text" id="savings" value={savings} onChange={handleInputChange(setSavings, 'savings', true, true)} />
                                        {errors.savings && <div className="error-message">{errors.savings}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="interestRate">{t.interestRate}:</label>
                                        <input type="number" step="0.01" id="interestRate" value={interestRate}                                        onChange={handleInputChange(setInterestRate, 'interestRate', true, false)} />
                                        {errors.interestRate && <div className="error-message">{errors.interestRate}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="savingsPeriod">{t.savingsPeriod}:</label>
                                        <select id="savingsPeriod" value={savingsPeriod} onChange={handleSelectChange(setSavingsPeriod, 'savingsPeriod')}>
                                            <option value="day">{t.day}</option>
                                            <option value="month">{t.month}</option>
                                            <option value="year">{t.year}</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="savingsDuration">{t.savingsDuration} ({t[savingsPeriod]}):</label>
                                        <input type="text" id="savingsDuration" value={savingsDuration} onChange={handleInputChange(setSavingsDuration, 'savingsDuration', true, true)} />
                                        {errors.savingsDuration && <div className="error-message">{errors.savingsDuration}</div>}
                                    </div>
                                </>
                            )}

                            {/* Investment */}
                            <div className="form-group checkbox-group">
                                <label>
                                    <input type="checkbox" checked={hasInvestment} onChange={handleCheckboxChange(setHasInvestment, 'hasInvestment')} />
                                    {t.hasInvestment}
                                </label>
                            </div>
                            {hasInvestment && (
                                <>
                                    <div className="form-group">
                                        <label htmlFor="investment">{t.investmentAmount} ({currency}):</label>
                                        <input type="text" id="investment" value={investment} onChange={handleInputChange(setInvestment, 'investment', true, true)} />
                                        {errors.investment && <div className="error-message">{errors.investment}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="expectedReturn">{t.expectedReturn}:</label>
                                        <input type="number" step="0.01" id="expectedReturn" value={expectedReturn} onChange={handleInputChange(setExpectedReturn, 'expectedReturn', true, false)} />
                                        {errors.expectedReturn && <div className="error-message">{errors.expectedReturn}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="investmentPeriod">{t.investmentPeriod}:</label>
                                        <select id="investmentPeriod" value={investmentPeriod} onChange={handleSelectChange(setInvestmentPeriod, 'investmentPeriod')}>
                                            <option value="day">{t.day}</option>
                                            <option value="month">{t.month}</option>
                                            <option value="year">{t.year}</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="investmentDuration">{t.investmentDuration} ({t[investmentPeriod]}):</label>
                                        <input type="text" id="investmentDuration" value={investmentDuration} onChange={handleInputChange(setInvestmentDuration, 'investmentDuration', true, true)} />
                                        {errors.investmentDuration && <div className="error-message">{errors.investmentDuration}</div>}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* Insurance */}
                <div className="accordion-section">
                    <h3 className="accordion-title" onClick={() => toggleAccordion('insurance')}>
                        {t.insurance} {isAccordionOpen.insurance ? '▲' : '▼'}
                    </h3>
                    {isAccordionOpen.insurance && (
                        <div className="accordion-content">
                            <div className="form-group checkbox-group">
                                <label>
                                    <input type="checkbox" checked={hasInsurance} onChange={handleCheckboxChange(setHasInsurance, 'hasInsurance')} />
                                    {t.hasInsurance}
                                </label>
                            </div>
                            {hasInsurance && (
                                <>
                                    <div className="form-group">
                                        <label htmlFor="insurancePremium">{t.insurancePremium} ({currency}):</label>
                                        <input type="text" id="insurancePremium" value={insurancePremium} onChange={handleInputChange(setInsurancePremium, 'insurancePremium', true, true)} />
                                        {errors.insurancePremium && <div className="error-message">{errors.insurancePremium}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="insurancePeriod">{t.insurancePeriod}:</label>
                                        <select id="insurancePeriod" value={insurancePeriod} onChange={handleSelectChange(setInsurancePeriod, 'insurancePeriod')}>
                                            <option value="month">{t.month}</option>
                                            <option value="year">{t.year}</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="insuranceDuration">{t.insuranceDuration} ({t[insurancePeriod]}):</label>
                                        <input type="text" id="insuranceDuration" value={insuranceDuration} onChange={handleInputChange(setInsuranceDuration, 'insuranceDuration', true, true)} />
                                        {errors.insuranceDuration && <div className="error-message">{errors.insuranceDuration}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="insuranceValue">{t.insuranceValue} ({currency}):</label>
                                        <input type="text" id="insuranceValue" value={insuranceValue} onChange={handleInputChange(setInsuranceValue, 'insuranceValue', true, true)} />
                                        {errors.insuranceValue && <div className="error-message">{errors.insuranceValue}</div>}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>

                 {/* Time Information */}
                <div className="accordion-section">
                    <h3 className="accordion-title" onClick={() => toggleAccordion('time')}>
                        {t.timeInfo} {isAccordionOpen.time ? 'Thời gian ▲' : 'Thời gian ▼'}
                    </h3>
                    {isAccordionOpen.time && (
                        <div className="accordion-content">
                            <div className="form-group">
                                <label htmlFor="workHours">{t.workHours}:</label>
                                <input type="text" id="workHours" value={workHours} onChange={handleInputChange(setWorkHours, 'workHours', true, true)} />
                                {errors.workHours && <div className="error-message">{errors.workHours}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="freeHours">{t.freeHours}:</label>
                                <input type="text" id="freeHours" value={freeHours} onChange={handleInputChange(setFreeHours, 'freeHours', true, true)} />
                                {errors.freeHours && <div className="error-message">{errors.freeHours}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="workDaysYear">{t.workDaysYear}:</label>
                                <input type="text" id="workDaysYear" value={workDaysYear} onChange={handleInputChange(setWorkDaysYear, 'workDaysYear', true, true)} />
                                {errors.workDaysYear && <div className="error-message">{errors.workDaysYear}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="holidaysYear">{t.holidaysYear}:</label>
                                <input type="text" id="holidaysYear" value={holidaysYear} onChange={handleInputChange(setHolidaysYear, 'holidaysYear', true, true)} />
                                {errors.holidaysYear && <div className="error-message">{errors.holidaysYear}</div>}
                            </div>
                              <div className="form-group">
                                <label htmlFor="workDaysWeek">{t.workDaysWeek}:</label>
                                 <input type="text" id="workDaysWeek" value={workDaysWeek} onChange={handleInputChange(setWorkDaysWeek, 'workDaysWeek', true, true)} />
                                 {errors.workDaysWeek && <div className="error-message">{errors.workDaysWeek}</div>}
                             </div>
                             <div className="form-group">
                                 <label htmlFor="daysOffWeek">{t.daysOffWeek}:</label>
                                  <input type="text" id="daysOffWeek" value={daysOffWeek} onChange={handleInputChange(setDaysOffWeek, 'daysOffWeek', true, true)} />
                                   {errors.daysOffWeek && <div className="error-message">{errors.daysOffWeek}</div>}
                               </div>
                        </div>
                    )}
                </div>

                <div className="button-group">
                    <button type="submit" className="calculate-btn">{t.calculate}</button>
                    <button type="button" className="reset-btn" onClick={handleReset}>{t.reset}</button>
                </div>
            </form>
        </div>
    );
}
function Result({ data, language }) {
    const t = translations[language];
    const [wealthIndex, setWealthIndex] = useState(0);
     const [timeWealthIndex, setTimeWealthIndex] = useState(0);  // New state
    const [timeWealthLevel, setTimeWealthLevel] = useState(''); // New State
    const [wealthLevel, setWealthLevel] = useState('');
    const [report, setReport] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [wealthPercentile, setWealthPercentile] = useState(0);
    const [barChartData, setBarChartData] = useState({});

    const exchangeRatesRef = useRef({
        USD: 1,
        VND: 24500,
        EUR: 0.92,
        JPY: 145,
        KRW: 1300,
    });

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const apiKey = 'fca_live_mTkAOXfDXkC8vD4L9cNY8p4Y3Rj8qUfKj8ysS5H8';
                const baseCurrency = 'USD';
                const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&base_currency=${baseCurrency}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (data.data) {
                    exchangeRatesRef.current = {
                        USD: data.data.USD,
                        VND: data.data.VND,
                        EUR: data.data.EUR,
                        JPY: data.data.JPY,
                        KRW: data.data.KRW,
                    };
                }
            } catch (error) {
                console.error("Failed to fetch exchange rates:", error);
            }
        };
        fetchExchangeRates();
    }, []);

    useEffect(() => {
        if (data) {
            setIsLoading(true);
            const timer = setTimeout(() => {
                calculateWealth();
                setIsLoading(false);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [data, language]);

    const convertCurrency = (amount, fromCurrency, toCurrency) => {
        const fromRate = exchangeRatesRef.current[fromCurrency];
        const toRate = exchangeRatesRef.current[toCurrency];

        if (!fromRate || !toRate) {
            console.error("Exchange rate not available for", fromCurrency, "or", toCurrency);
            return amount;
        }
        const amountInUSD = fromCurrency === 'USD' ? amount : amount / fromRate;
        return amountInUSD * toRate;
    };

    const calculateFutureValue = (presentValue, rate, period, duration) => {
        const numDuration = parseFloat(duration);
        if (isNaN(numDuration)) {
            return presentValue;
        }
        if (period === 'day') {
            const dailyRate = rate / 365 / 100;
            return presentValue * Math.pow(1 + dailyRate, numDuration);

        } else if (period === 'month') {
            const monthlyRate = rate / 12 / 100;
            return presentValue * Math.pow(1 + monthlyRate, numDuration);
        } else { //year
            const yearlyRate = rate / 100;
            return presentValue * Math.pow(1 + yearlyRate, numDuration);
        }
    };

    const calculateWealth = () => {
      if (!data) return;
      //Financial
        const dependentCost = convertCurrency(5000000, "VND", data.currency);
        const regionCoefficient = { hcm: 1.0, danang: 0.8, other: 0.6 };

        let totalSavings = 0;
        if (data.hasSavings) {
            totalSavings = calculateFutureValue(data.savings, data.interestRate, data.savingsPeriod, data.savingsDuration);
            totalSavings = convertCurrency(totalSavings, "VND", data.currency);
        }

        let totalInvestment = 0;
        if (data.hasInvestment) {
            totalInvestment = calculateFutureValue(data.investment, data.expectedReturn, data.investmentPeriod, data.investmentDuration);
            totalInvestment = convertCurrency(totalInvestment, "VND", data.currency);
        }

        let totalDebt = data.debt;
        let totalDebtCost = 0;
        const debtIncurredRate = data.debtRate / 100 / 12; // Monthly rate
        for (let i = 0; i < 12; i++){
            let interest = totalDebt * debtIncurredRate;
            totalDebtCost += interest;
            totalDebt = (totalDebt+ interest);
        }
        let insuranceCost = 0;
        if(data.hasInsurance){
            insuranceCost = calculateFutureValue(data.insurancePremium, 0, data.insurancePeriod, data.insuranceDuration); // No interest.
            insuranceCost = convertCurrency(insuranceCost, "VND", data.currency) ;
         }

        const convertedIncome = convertCurrency(data.income, "VND", data.currency);
        const convertedExpenses = convertCurrency(data.expenses, "VND", data.currency);
        const disposableIncome =
            convertedIncome -
            convertedExpenses -
            dependentCost * data.dependents -
             (data.hasInsurance ? insuranceCost/12: 0) +
            (data.hasInvestment ? (totalInvestment - data.investment) / 12 : 0) +
            (data.hasSavings ? (totalSavings - data.savings) / 12 : 0);

        const netWorth =
            convertCurrency(data.assets, "VND", data.currency) +
            (data.hasSavings ? totalSavings : 0) +
            (data.hasInvestment ? totalInvestment : 0) +
            (data.hasInsurance ? convertCurrency(data.insuranceValue, "VND", data.currency) : 0) -
             convertCurrency(data.debt, "VND", data.currency);

        const calculatedWealthIndex = disposableIncome * regionCoefficient[data.region] + netWorth * 0.1;
        setWealthIndex(calculatedWealthIndex);

        const wealthLevels = {
            veryPoor: convertCurrency(0, "VND", data.currency),
            poor: convertCurrency(5000000, "VND", data.currency),
            nearPoor: convertCurrency(15000000, "VND", data.currency),
            lowerMiddle: convertCurrency(30000000, "VND", data.currency),
            middle: convertCurrency(70000000, "VND", data.currency),
            upperMiddle: convertCurrency(150000000, "VND", data.currency),
            wellOff: convertCurrency(500000000, "VND", data.currency),
            rich: convertCurrency(2000000000, "VND", data.currency),
            veryRich: convertCurrency(10000000000, "VND", data.currency),
        };
        let levelKey = '';
        if (calculatedWealthIndex < wealthLevels.veryPoor) levelKey = 'veryPoor';
        else if (calculatedWealthIndex < wealthLevels.poor) levelKey = 'poor';
        else if (calculatedWealthIndex < wealthLevels.nearPoor) levelKey = 'nearPoor';
        else if (calculatedWealthIndex < wealthLevels.lowerMiddle) levelKey = 'lowerMiddle';
        else if (calculatedWealthIndex < wealthLevels.middle) levelKey = 'middle';
        else if (calculatedWealthIndex < wealthLevels.upperMiddle) levelKey = 'upperMiddle';
        else if (calculatedWealthIndex < wealthLevels.wellOff) levelKey = 'wellOff';
        else if (calculatedWealthIndex < wealthLevels.rich) levelKey = 'rich';
        else if (calculatedWealthIndex < wealthLevels.veryRich) levelKey = 'veryRich';
        else levelKey = 'extremelyRich';

        setWealthLevel(t.wealthLevels[levelKey]);

        const percentile = Math.min(99, Math.max(1, Math.round(100 - (calculatedWealthIndex / convertCurrency(2000000000, "VND", data.currency)) * 100)));
        setWealthPercentile(percentile);


        // --- Time Wealth Calculation ---
        const workHoursPerYear = data.workHours * data.workDaysYear;
        const freeHoursPerYear = data.freeHours * (365 - data.holidaysYear);
        const totalHoursPerYear = 365 * 24;  // Total hours in a year.
         //This method measures how much time people spend to afford to have enough wealth(or how wealthy people if we compare their work time and their total money.)
        const timeWealth = (calculatedWealthIndex / (workHoursPerYear + 1e-9)) / (freeHoursPerYear + 1e-9); // Small value added to prevent division by zero.  Wealth per unit of work time, divided by available free hours

        // Normalization
        let normalizedTimeWealth = Math.max(0, (timeWealth / 10000));  // Normalize by experience, wealth level. + ensure non-negative.
        normalizedTimeWealth = Math.min(1, normalizedTimeWealth); // Prevent going beyond our scale. 0-1

        setTimeWealthIndex(normalizedTimeWealth);

        //Determine Time Wealth Levels
        let timeLevelKey = '';
        if (normalizedTimeWealth < 0.15) timeLevelKey = 'veryTimePoor';
        else if (normalizedTimeWealth < 0.3) timeLevelKey = 'timePoor';
        else if (normalizedTimeWealth < 0.45) timeLevelKey = 'moderatelyTimePoor';
        else if (normalizedTimeWealth < 0.55) timeLevelKey = 'timeNeutral';
        else if (normalizedTimeWealth < 0.7) timeLevelKey = 'moderatelyTimeRich';
        else if (normalizedTimeWealth < 0.85) timeLevelKey = 'timeRich';
        else timeLevelKey = 'veryTimeRich';
        setTimeWealthLevel(t.timeWealthLevels[timeLevelKey]);  // Translate and set level



        // Report
        const formatNumberForReport = (num) => num.toLocaleString(language === 'ja' ? 'ja-JP' : (language === 'ko' ? 'ko-KR' : 'de-DE'));

        const formatReportTextSavings = data.hasSavings
            ? `${formatNumberForReport(data.savings)} ${data.currency}, ${data.interestRate}%/${t[data.savingsPeriod]}, ${t.total}: ${formatNumberForReport(totalSavings)} ${data.currency}`
            : t.no;
        const formatReportTextInvestment = data.hasInvestment
            ? `${formatNumberForReport(data.investment)} ${data.currency}, ${data.expectedReturn}%/${t[data.investmentPeriod]}, ${t.total}: ${formatNumberForReport(totalInvestment)} ${data.currency}`
            : t.no;
        const formatReportTextInsurance = data.hasInsurance
             ? `${t.insurancePremium}: ${formatNumberForReport(data.insurancePremium)} ${data.currency}/${t[data.insurancePeriod]}, ${t.insuranceValue}: ${formatNumberForReport(data.insuranceValue)} ${data.currency}, ${t.total} ${t.insurancePeriod} ${formatNumberForReport(insuranceCost)}`
            : t.no;

        const generatedReport = {
             inputs: {
                [t.reportInput['Thu nhập']]: formatNumberForReport(data.income) + ' ' + data.currency,
                [t.reportInput['Chi phí']]: formatNumberForReport(data.expenses) + ' ' + data.currency,
                [t.reportInput['Khu vực']]: regionCoefficient[data.region] === 1.0 ?  t.regions.hcm : (regionCoefficient[data.region] === 0.8 ? t.regions.danang:  t.regions.other),
                [t.reportInput['Số người phụ thuộc']]: data.dependents,
                [t.reportInput['Tài sản']]: formatNumberForReport(data.assets) + ' ' + data.currency,
                [t.reportInput['Nợ']]: formatNumberForReport(data.debt) + ' ' + data.currency,
                'Tiền gửi': formatReportTextSavings,
                'Đầu tư': formatReportTextInvestment,
                'Bảo hiểm': formatReportTextInsurance,
                "Lãi Nợ Phải Trả (1 năm)": formatNumberForReport(totalDebtCost) + " " + data.currency,
                 [t.workHours]: data.workHours,          // Include time data
                [t.freeHours]: data.freeHours,
                [t.workDaysYear]: data.workDaysYear,
                [t.holidaysYear]: data.holidaysYear,
                 [t.workDaysWeek]: data.workDaysWeek,
                [t.daysOffWeek]: data.daysOffWeek,

            },
            calculations: {
                [t.reportCalc['Thu nhập khả dụng']]: formatNumberForReport(disposableIncome) + ' ' + data.currency,
                [t.reportCalc['Tài sản ròng (ước tính 1 năm)']] : formatNumberForReport(netWorth) + ' ' + data.currency,
                [t.reportCalc['Wealth Index']]: formatNumberForReport(calculatedWealthIndex) + ' ' + data.currency,
                 "Nợ phải trả (1 năm)": formatNumberForReport(totalDebt) + " " + data.currency, // Include debt costs
                [t.timeWealthIndex]: timeWealthIndex.toFixed(2), // Display with 2 decimal places

            },
             evaluation: {
                [t.reportEval['Mức độ giàu có']]: wealthLevel,
                [t.reportEval['Độ giàu có so với dân số (ước tính)']]: `${percentile}%`,
                'Mức độ giàu có thời gian': timeWealthLevel, // New evaluation
            }
        };
        setReport(generatedReport);

        // --- Bar Chart ---
        const barData = {
            labels: [t.reportCalc['Thu nhập khả dụng'], t.reportCalc['Tài sản ròng (ước tính 1 năm)'], t.reportCalc['Wealth Index'], "Nợ Phải Trả ( 1 năm)", "Lãi Phải Trả (1 năm)"],
            datasets: [
                {
                    label:  t.wealthIndex +  ' (' + data.currency + ')',
                    data: [disposableIncome, netWorth, calculatedWealthIndex, totalDebt, totalDebtCost],
                      backgroundColor: [
                        'rgba(75, 192, 192, 0.6)',  // Teal
                        'rgba(255, 206, 86, 0.6)',  // Yellow
                        'rgba(255, 99, 132, 0.6)',  // Red,
                        'rgba(54, 162, 235, 0.6)', //debt blue
                         'rgba(255, 159, 64, 0.6)', //debt fee
                    ],
                },
            ],
        };
        setBarChartData(barData);
    };

    const barChartOptions = {
         plugins: {
            legend: {
                position: 'top',
            },
             tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                         const value = context.parsed.y;
                        return label + value.toLocaleString(language === 'ja' ? 'ja-JP' : (language === 'ko' ? 'ko-KR' : 'de-DE')) + ' ' + data.currency;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    const renderReportSection = (title, data) => (
        <div className="report-section">
            <h4>{title}</h4>
            {Object.entries(data).map(([key, value]) => (
                <div key={key} className="report-item">
                    <div className="report-item-label">{key}</div>
                    <div className="report-item-value">{value}</div>
                </div>
            ))}
        </div>
    );

    return (
        <div className={`result-container ${data ? 'visible' : ''}`}>
            {isLoading ? (
                <div className="spinner"></div>
            ) : (
                <>
                    <div className='result-summary'>
                        <h2 className="result-title">{t.results}</h2>
                         <p className="result-level">{t.wealthLevel}: {wealthLevel}</p>
                        <p className="result-index">{t.wealthIndex}: {wealthIndex.toLocaleString(language === 'ja' ? 'ja-JP' : (language === 'ko' ? 'ko-KR' : 'de-DE'))} {data?.currency}</p>
                        <p className="result-percentile">
                           {t.wealthPercentile}: {wealthPercentile}%
                        </p>
                       <p className="result-time-wealth">{t.timeWealthIndex}: {timeWealthLevel}</p>
                    </div>

                    <div className="chart-container">
                        <Bar data={barChartData} options={barChartOptions} />
                    </div>

                    <div className="report-container">
                        <h3>{t.report}</h3>
                        {renderReportSection(t.inputInfo, report.inputs)}
                        {renderReportSection(t.calculations, report.calculations)}
                        {renderReportSection(t.evaluation, report.evaluation)}
                    </div>
                </>
            )}
        </div>
    );
}

function Footer({ language }) {
     const t = translations[language];
    return (
        <footer>
           <p>© {new Date().getFullYear()} WealthMeter. All rights reserved.</p>
        </footer>
    );
}

function App() {
    const [formData, setFormData] = useState(null);
    const [language, setLanguage] = useState('vi');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [currency, setCurrency] = useState('VND');

    useEffect(() => {
        const storedData = localStorage.getItem('wealthData');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            const validCurrencies = ['VND', 'USD', 'EUR', 'JPY', 'KRW'];
            const storedCurrency = parsedData.currency;
            setFormData(parsedData);
            if (validCurrencies.includes(storedCurrency)) {
                setCurrency(storedCurrency);
            }
        }
    }, []);

    const handleCalculate = (data) => {
         const dataToStore = { ...data, currency: 'VND' };
        setFormData(data);
        localStorage.setItem('wealthData', JSON.stringify(dataToStore));
    };

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
            <Header language={language} setLanguage={setLanguage} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            <main className="main-content">
                <Form onCalculate={handleCalculate} language={language} currency={currency} setCurrency={setCurrency} />
                <Result data={formData} language={language} />
            </main>
            <Footer language={language} />
        </div>
    );
}

export default App;