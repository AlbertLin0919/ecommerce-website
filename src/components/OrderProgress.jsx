const OrderProgress = ({ currentStep }) => {
  const currentSteps = Array.isArray(currentStep) ? currentStep : [currentStep];
  return (
    <div className="col-6 py-5 checkout-nav">
      <ul className="cartList">
        <li className={currentSteps.includes(1) ? "active" : ""}>
          1 <p>購物車</p>
        </li>
        <li className={currentSteps.includes(2) ? "active" : ""}>
          2<p>填寫資料</p>
        </li>
        <li className={currentSteps.includes(3) ? "active" : ""}>
          3<p>訂單確認</p>
        </li>
      </ul>
    </div>
  );
};

export default OrderProgress;
