import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  handleSuccessMessage,
  handleErrorMessage,
} from "../store/AllSlice/messageSlice";

const ProductModal = ({
  closeProductModal,
  getProducts,
  type,
  pagination,
  tempProduct,
}) => {
  const [tempData, setTempData] = useState({
    title: "",
    category: "",
    origin_price: "",
    price: "",
    unit: "",
    description: "",
    content: "",
    is_enabled: 1,
    imageUrl: "",
    imagesUrl: [],
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "create") {
      setTempData({
        title: "",
        category: "",
        origin_price: "",
        price: "",
        unit: "",
        description: "",
        content: "",
        is_enabled: 1,
        imageUrl: "",
        imagesUrl: [],
      });
    } else if (type === "edit") {
      setTempData(tempProduct);
    }
  }, [type, tempProduct]);

  console.log(tempData);

  const handleChange = (e) => {
    const { value, name, checked, files } = e.target;
    if (["price", "origin_price"].includes(name)) {
      setTempData({ ...tempData, [name]: Number(value) });
    } else if (name === "is_enabled") {
      setTempData({ ...tempData, [name]: +checked });
    } else if (name === "imageUrl") {
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
          setTempData({ ...tempData, imageUrl: e.target.result });
        };
        reader.readAsDataURL(files[0]);
      } else {
        setTempData({ ...tempData, imageUrl: value });
      }
    } else if (name === "imagesUrl") {
      const images = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = function (e) {
          images.push(e.target.result);
          if (images.length === files.length) {
            setTempData({ ...tempData, imagesUrl: images });
          }
        };
        reader.readAsDataURL(files[i]);
      }
    } else {
      setTempData({ ...tempData, [name]: value });
    }
  };

  const submit = async () => {
    try {
      let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`;
      let method = "post";
      if (type === "edit") {
        api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${tempProduct.id}`;
        method = "put";
      }
      const res = await axios[method](api, { data: tempData });
      console.log(res);
      handleSuccessMessage(dispatch, res);
      closeProductModal();
      getProducts(pagination.current_page);
    } catch (error) {
      console.log(error);
      handleErrorMessage(dispatch, error);
    }
  };
  return (
    // <!-- Modal -->

    <div
      className="modal fade"
      tabIndex="-1"
      id="productModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {type === "create" ? "建立新商品" : `編輯${tempData.title}`}
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeProductModal}
            />
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-sm-4">
                <div className="image-group border-bottom pb-2">
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="image">
                      輸入主要圖片網址
                      <input
                        type="text"
                        name="imageUrl"
                        id="image"
                        placeholder="請輸入圖片連結"
                        className="form-control"
                        onChange={handleChange}
                        defaultValue={tempData.imageUrl}
                      />
                    </label>
                  </div>
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="customFile">
                      或 上傳圖片
                      <input
                        type="file"
                        name="imageUrl"
                        id="customFile"
                        className="form-control"
                        onChange={handleChange}
                        disabled={tempData.imageUrl ? true : false}
                      />
                    </label>
                  </div>
                </div>
                {/* <div className="image-group border-bottom py-2">
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="image1">
                      輸入圖片網址1
                      <input
                        type="text"
                        name="imagesUrl"
                        id="image1"
                        placeholder="請輸入圖片連結"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.imagesUrl && tempData.imagesUrl[0]}
                      />
                    </label>
                  </div>
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="customFile1">
                      或 上傳圖片1
                      <input
                        type="file"
                        name="imagesUrl"
                        id="customFile1"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
                <div className="image-group border-bottom py-2">
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="image2">
                      輸入圖片網址2
                      <input
                        type="text"
                        name="imagesUrl"
                        id="image2"
                        placeholder="請輸入圖片連結"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="customFile2">
                      或 上傳圖片2
                      <input
                        type="file"
                        name="imagesUrl"
                        id="customFile2"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
                <div className="image-group border-bottom py-2">
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="image3">
                      輸入圖片網址3
                      <input
                        type="text"
                        name="imagesUrl"
                        id="image3"
                        placeholder="請輸入圖片連結"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="customFile3">
                      或 上傳圖片3
                      <input
                        type="file"
                        name="imagesUrl"
                        id="customFile3"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
                <div className="image-group ">
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="image4">
                      輸入圖片網址4
                      <input
                        type="text"
                        name="imagesUrl"
                        id="image4"
                        placeholder="請輸入圖片連結"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="customFile4">
                      或 上傳圖片4
                      <input
                        type="file"
                        name="imagesUrl"
                        id="customFile4"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div> */}
              </div>
              <div className="col-sm-8">
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="title">
                    標題
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="請輸入標題"
                      className="form-control"
                      onChange={handleChange}
                      defaultValue={tempData.title}
                    />
                  </label>
                </div>
                <div className="row">
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="category">
                      分類
                      <input
                        type="text"
                        id="category"
                        name="category"
                        placeholder="請輸入分類"
                        className="form-control"
                        onChange={handleChange}
                        defaultValue={tempData.category}
                      />
                    </label>
                  </div>
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="unit">
                      單位
                      <input
                        type="unit"
                        id="unit"
                        name="unit"
                        placeholder="請輸入單位"
                        className="form-control"
                        onChange={handleChange}
                        defaultValue={tempData.unit}
                      />
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="origin_price">
                      原價
                      <input
                        type="number"
                        id="origin_price"
                        name="origin_price"
                        placeholder="請輸入原價"
                        className="form-control"
                        onChange={handleChange}
                        defaultValue={tempData.origin_price}
                      />
                    </label>
                  </div>
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="price">
                      售價
                      <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="請輸入售價"
                        className="form-control"
                        onChange={handleChange}
                        defaultValue={tempData.price}
                      />
                    </label>
                  </div>
                </div>
                <hr />
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="description">
                    產品描述
                    <textarea
                      type="text"
                      id="description"
                      name="description"
                      placeholder="請輸入產品描述"
                      className="form-control"
                      rows={6}
                      onChange={handleChange}
                      defaultValue={tempData.description}
                    />
                  </label>
                </div>
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="content">
                    說明內容
                    <textarea
                      type="text"
                      id="content"
                      name="content"
                      placeholder="請輸入產品說明內容"
                      className="form-control"
                      rows={6}
                      onChange={handleChange}
                      defaultValue={tempData.content}
                    />
                  </label>
                </div>
                <div className="form-group mb-2">
                  <div className="form-check">
                    <label
                      className="w-100 form-check-label"
                      htmlFor="is_enabled"
                    >
                      是否啟用
                      <input
                        type="checkbox"
                        id="is_enabled"
                        name="is_enabled"
                        placeholder="請輸入產品說明內容"
                        className="form-check-input"
                        onChange={handleChange}
                        checked={!!tempData.is_enabled}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeProductModal}
            >
              關閉
            </button>
            <button type="button" className="btn btn-primary" onClick={submit}>
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
