import React from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
const Title = styled(Paper)(() => ({ fontSize: 24, marginBottom: 32 }));
const Container = styled(Paper)(() => ({
  padding: 0,
  whiteSpace: "nowrap",
  overflowX: "hidden",
  cursor: "pointer",
  "&:hover": {
    overflowX: "scroll",
  },
  "&::-webkit-scrollbar": {
    backgroundColor: "#f5f5f5",
    height: 8,
  },
  "&::-webkit-scrollbar-track": {
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: 10,
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
    backgroundColor: "#757575",
  },
}));
const Product = styled(Paper)(() => ({
  width: 390,
  listStyle: "none",
  display: "inline-block",
  marginRight: 20,
  marginBottom: 40,
}));
const ProductImage = styled(Paper)(() => ({
  "&:hover": {
    opacity: 0.7,
  },
  width: "100%",
  transition: "opacity 1s",
}));
const ProductDetailContainer = styled(Paper)(() => ({
  fontSize: 16,
  display: "flex",
  marginTop: 12,
  lineHeight: 1.5,
  whiteSpace: "normal",
}));
const ProductDetail = styled(Paper)(() => ({
  flex: "0 0 300px",
}));
const Price = styled(Paper)(() => ({
  flex: "1 1 auto",
}));
const ProductType = styled(Paper)(() => ({
  color: "#757575",
}));
const ProductScroll = () => {
  const data = useSelector((state) => state.reducerURL?.data);
  console.log("data", data);
  const isLoading = useSelector((state) => state.reducerURL?.isLoading);
  const listProduct = data.slice(0, 5).map((item, index) => {
    return (
      <Product key={index}>
        <Link to={{ pathname: `/detailProduct/${item._id}` }}>
          <ProductImage>
            <img src={item.img} width={340} />
          </ProductImage>
        </Link>
        <ProductDetailContainer>
          <ProductDetail>
            <ProductType>{item.name}</ProductType>
            <ProductType>{item.message}</ProductType>
          </ProductDetail>
          <Price>{item.price.toLocaleString()}$</Price>
        </ProductDetailContainer>
      </Product>
    );
  });
  let listProductScrollLazyLoad = [];
  for (let i = 0; i < 0; i++) {
    listProductScrollLazyLoad.push(
      <Product key={i}>
        <Skeleton>
          <ProductImage>
            <img src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/cd24d530-e885-4b32-a912-777898b763a2/air-max-dawn-shoe-bsg6cw.png" />
          </ProductImage>
        </Skeleton>
        <ProductDetailContainer>
          <ProductDetail>
            <Skeleton>
              <ProductType>type</ProductType>
              <ProductType>name</ProductType>
            </Skeleton>
          </ProductDetail>
          <Price>2.000.000</Price>
        </ProductDetailContainer>
      </Product>
    );
  }
  return (
    <div>
      <Title> Clean Looks, Sustainable Materials</Title>
      {isLoading ? (
        <Container>{listProductScrollLazyLoad}</Container>
      ) : (
        <Container>{listProduct}</Container>
      )}
    </div>
  );
};

export default ProductScroll;
