import "./mainCategory.scss";

import bento from "../../../images/bento.jpg";
import cake1 from "../../../images/cake1+.jpg";
import deserts from "../../../images/deserts.jpg";
import cake2 from "../../../images/cake2+.jpg";
import { Link } from "react-router-dom";

const MainCategoryCard = ({
  name,
  image,
  path,
}: {
  name: string;
  image: string;
  path: string;
}) => {
  return (
    <div className="category-card">
      <div className="category-card--image">
        <div>
          <img src={image} alt={name} />
        </div>
      </div>
      <h3>{name}</h3>
      <Link to={path}>
        <button className="category-card--btn">Просмотреть больше</button>
      </Link>
    </div>
  );
};

const MainCategory = () => {
  return (
    <section className="category wrapper">
      <h2>Категории</h2>
      <div className="category-cards">
        <MainCategoryCard
          name="Бенто"
          image={bento}
          path="/catalog?category=64295faa3c3722ddca7e8b18"
        />
        <MainCategoryCard
          name="Торты 1 кг"
          image={cake1}
          path="/catalog?category=6422c9a01aff927fcfc0c8e5"
        />
        <MainCategoryCard
          name="Торты от 2 кг"
          image={cake2}
          path="/catalog?category=6422c747ef7838855c91e7c6"
        />
        <MainCategoryCard
          name="Десерты"
          image={deserts}
          path="/catalog?category=645e4e96efe4fbc545fa97f6"
        />
      </div>
    </section>
  );
};

export default MainCategory;
