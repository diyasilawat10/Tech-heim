import './TopBrands.css';
import appleLogo from '../../../assets/icons/applelogo.svg';
import sonyLogo from '../../../assets/icons/sonylogo.svg';
import samsungLogo from '../../../assets/icons/samsunglogo.svg';
import canonLogo from '../../../assets/icons/canonlogo.svg';
import huaweiLogo from '../../../assets/icons/huawei.svg';
import lenovoLogo from '../../../assets/icons/lenovologo.svg';

function TopBrands() {
  return (
    <section className="top-brands-wrapper">
      <div className="top-brands-header">
        <h2>Top Brands</h2>
        <div className="top-brands-line" />
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
