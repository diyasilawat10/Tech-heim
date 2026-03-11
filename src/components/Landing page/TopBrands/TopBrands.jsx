import './TopBrands.css';
import arrowRightIcon from '../../../assets/icons/arrow-circle-right.svg';
import appleLogo from '../../../assets/icons/applelogo.svg';
import sonyLogo from '../../../assets/icons/sonylogo.svg';
import samsungLogo from '../../../assets/icons/samsunglogo.svg';
import canonLogo from '../../../assets/icons/canonlogo.svg';
import huaweiLogo from '../../../assets/icons/huawei.svg';
import lenovoLogo from '../../../assets/icons/lenovologo.svg';

function TopBrands() {
  return (
    <section className="top-brands-wrapper main-container main-section">
      <div className="top-brands-header">
        <div className="top-brands-header-row">
          <h2>Top Brands</h2>
          <button type="button" className="top-brands-view-all">
            <span>View all</span>
            <img src={arrowRightIcon} alt="" aria-hidden="true" />
          </button>
        </div>
        <div className="top-brands-line section-divider" />
      </div>

      <div className="top-brands-logos" aria-label="Top brands">
        <img className="top-brand-logo logo-apple" src={appleLogo} alt="Apple" />
        <img className="top-brand-logo logo-sony" src={sonyLogo} alt="Sony" />
        <img className="top-brand-logo logo-samsung" src={samsungLogo} alt="Samsung" />
        <img className="top-brand-logo logo-canon" src={canonLogo} alt="Canon" />
        <img className="top-brand-logo logo-huawei" src={huaweiLogo} alt="Huawei" />
        <img className="top-brand-logo logo-lenovo" src={lenovoLogo} alt="Lenovo" />
      </div>
    </section>
  );
}

export default TopBrands;
