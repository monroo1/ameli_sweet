import { Slider, FormControlLabel, RadioGroup, Radio } from "@mui/material";

import "./configurated.scss";
import Button from "../../UI/button/Button";

const CatalogConfigurated = ({
  count,
  desertsCount,
  bentoCount,
  cake1Count,
  cake2Count,
  minmin,
  maxmax,
  value,
  setValue,
  setMinNum,
  setMaxNum,
  priceRangeValue,
  setPriceRangeValue,
  handlePressFiltredPrice,
}: any) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handlePriceRangeChange = (event: any, newValue: any) => {
    setMinNum(newValue[0]);
    setMaxNum(newValue[1]);
    setPriceRangeValue(newValue);
  };

  return (
    <div className="configurated">
      <div className="configurated-price">
        <h4>Фильтр по цене</h4>
        <Slider
          getAriaLabel={() => "Price range"}
          value={priceRangeValue}
          onChange={handlePriceRangeChange}
          valueLabelDisplay="auto"
          min={minmin}
          max={maxmax}
          sx={{
            color: "#EBA793",
            height: 7,
            "& .MuiSlider-thumb": {
              height: 22,
              width: 22,
              backgroundColor: "#fff",
              border: "2px solid #EBA793",
              "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
                boxShadow: "inherit",
              },
              "&:before": {
                display: "none",
              },
            },
          }}
        />
        <div className="configurated-price--group">
          <p>
            Цена: {priceRangeValue[0]} ₽ - {priceRangeValue[1]} ₽
          </p>
          <div onClick={handlePressFiltredPrice}>
            <Button name="Применить" size="sx" />
          </div>
        </div>
      </div>
      <div className="configurated-category">
        <h4>Категории</h4>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value=""
            control={
              <Radio
                sx={{
                  "&, &.Mui-checked": {
                    color: "#EBA793",
                  },
                }}
              />
            }
            label={"Все (" + count + ")"}
          />
          <FormControlLabel
            value="64295faa3c3722ddca7e8b18"
            control={
              <Radio
                sx={{
                  "&, &.Mui-checked": {
                    color: "#EBA793",
                  },
                }}
              />
            }
            label={"Бенто (" + bentoCount + ")"}
          />
          <FormControlLabel
            value="6422c9a01aff927fcfc0c8e5"
            control={
              <Radio
                sx={{
                  "&, &.Mui-checked": {
                    color: "#EBA793",
                  },
                }}
              />
            }
            label={"Торты 1 кг (" + cake1Count + ")"}
          />
          <FormControlLabel
            value="6422c747ef7838855c91e7c6"
            control={
              <Radio
                sx={{
                  "&, &.Mui-checked": {
                    color: "#EBA793",
                  },
                }}
              />
            }
            label={"Торты от 2 кг (" + cake2Count + ")"}
          />
          <FormControlLabel
            value="645e4e96efe4fbc545fa97f6"
            control={
              <Radio
                sx={{
                  "&, &.Mui-checked": {
                    color: "#EBA793",
                  },
                }}
              />
            }
            label={"Десерты (" + desertsCount + ")"}
          />
        </RadioGroup>
      </div>
    </div>
  );
};

export default CatalogConfigurated;
