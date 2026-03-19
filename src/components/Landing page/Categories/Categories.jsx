import './Categories.css';
import accessoriesImg from '../../../assets/images/accessories.png';
import cameraImg from '../../../assets/images/camera.png';
import smartphoneImg from '../../../assets/images/smartphone.png';
import macbookImg from '../../../assets/images/macbook.png';
import gamingImg from '../../../assets/images/gaming.png';
import smartwatchImg from '../../../assets/images/smartwatch.png';

function Categories() {
  return (
    <section className="categories-section main-section">
      <div className="main-container categories">

        <div className="category">
          <div className="category-inner">
            <img src={accessoriesImg} alt="Accessories" />
            <p>Accessories</p>
          </div>
        </div>

        <div className="category">
          <div className="category-inner">
            <img src={cameraImg} alt="Camera" />
            <p>Camera</p>
          </div>
        </div>

        <div className="category">
          <div className="category-inner">
            <img src={smartphoneImg} alt="Smart Phone" />
            <p>Smart Phone</p>
          </div>
        </div>

        <div className="category">
          <div className="category-inner">
            <img src={macbookImg} alt="Macbook" />
            <p>Laptop</p>
          </div>
        </div>

        <div className="category">
          <div className="category-inner">
            <img src={gamingImg} alt="Gaming" />
            <p>Gaming</p>
          </div>
        </div>

        <div className="category">
          <div className="category-inner">
            <img src={smartwatchImg} alt="Smart Watch" />
            <p>Smart Watch</p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Categories;
