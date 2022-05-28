import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  apiFetchPostDetail,
  apiGetBrandByCategory,
  categoryData,
  statusData,
  storageData,
  storageTypeData,
} from "../constants";
import { useParams } from "react-router-dom";
import "../scss/volt/components/_detail.scss";

export default function Detail() {
  const [isTrade, setIsTrade] = useState(false);
  const [isFree, setIsFree] = useState(false);
  const [imageUrlEdit, setImageUrlEdit] = useState([]);
  const [address, setAddress] = useState("");

  const [postInfor, setPostInfor] = useState({
    category: 1, //1:phone, 2: laptop, 3: pc
    name: "",
    brand: null,
    status: null,
    guarantee: null,
    cpu: null,
    gpu: null,
    ram: null,
    storage_type: "",
    storage: null,
    address: "",
    price: null,
    title: "",
    description: "",
    display_size: null,
    public_status: 1,
    is_trade: 0,
    color: "",
    video_url: "",
  });
  const [postTradeInfor, setPostTradeInfor] = useState({
    category: 1, //1:phone, 2: laptop, 3: pc
    name: "",
    brand: "",
    status: "",
    guarantee: null,
    cpu: "",
    gpu: "",
    ram: null,
    storage_type: null,
    display_size: null,
    storage: null,
    description: "",
  });
  const params = useParams();
  useEffect(() => {
    fetchAllData(params.id);
    return () => {
      setPostInfor({});
      setPostTradeInfor({});
    };
  }, []);

  useEffect(() => {
    fetchBrand(postInfor.category);
    return () => {};
  }, [postInfor.category]);

  const [brandCategory, setbrandCategory] = useState([]);
  const fetchBrand = async (id) => {
    if (id == "1" || id == "2")
      try {
        await axios.get(`${apiGetBrandByCategory}/${id}`).then((res) => {
          const brands = res.data.data;
          setbrandCategory(brands);
        });
      } catch (error) {
        return { statusCode: 500, body: error.toString() };
      }
  };

  const [postDetail, setPostDetail] = useState({});
  const fetchAllData = async (postId) => {
    let apiPostDetail = `${apiFetchPostDetail}/${postId}`;
    const requestPost = axios.get(apiPostDetail);
    await axios
      .all([requestPost])
      .then(
        axios.spread((...responses) => {
          const post = responses[0].data.data;
          console.log("post", post);
          setPostDetail(post);
          if (post.price == 0) setIsFree(true);
          const name = "category";
          const value = post.category_id;
          setPostInfor((prevState) => ({
            ...prevState,
            [name]: value,
          }));
          //   setAddress(post.address);
          setPostInforData(post);
          if (post.postTrade != null) {
            setPostTradeInforData(post.postTrade);
            setIsTrade(true);
          }
          setPostInforData(post);
          setImageUrlEdit(post.images);
        })
      )
      .catch((errors) => {
        console.error(errors);
      });
  };

  const setPostInforData = (data) => {
    setPostInfor({
      category: data.category_id,
      name: data.name,
      brand: data.brand_id,
      status: data.status,
      guarantee: data.guarantee,
      cpu: data.cpu,
      gpu: data.gpu,
      ram: data.ram,
      storage_type: data.storage_type,
      storage: data.storage,
      address: data.address,
      price: data.price,
      title: data.title,
      description: data.description,
      display_size: data.display_size,
      public_status: data.public_status,
      is_trade: data.is_trade,
      color: data.color,
      video_url: data.video_url,
    });
  };

  const setPostTradeInforData = (data) => {
    console.log("post trade", data);
    setPostTradeInfor({
      id: data.id,
      category: data.category_id,
      name: data.name,
      guarantee: data.guarantee,
      title: data.title,
      description: data.description,
    });
  };

  return (
    <div className="createPostContainer">
      <div container className="form-container">
        <div className="create-post-images row">
          <div className="image-post col-lg-6 col-sm-12">
            <div className="custom-file">
              <label htmlFor="file-upload" className="custom-file-upload">
                <i className="fas fa-upload"></i> Hình ảnh
              </label>
            </div>
            <div className="mt-3 view-preview row">
              {imageUrlEdit &&
                imageUrlEdit.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="col-lg-6 col-md-3 col-sm-6 image-preview mb-2 "
                    >
                      <div className="image-selected">
                        <img src={item.image_url} alt="" width="100%" />
                        {index === 0 ? (
                          <div className="title-cover-image">
                            <p>Ảnh bìa</p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="video-post col-lg-6 col-sm-12">
            <div className="custom-video">
              <label htmlFor="video-upload" className="custom-video-upload">
                <i className="fas fa-upload"></i>Video
              </label>
            </div>
            <div className="mt-3 view-preview row">
              {postInfor.video_url && (
                <>
                  <video width="400" controls>
                    <source src={postInfor.video_url} />
                  </video>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="create-post-detail">
          <div className="mb-3">
            <h3>Thông tin sản phẩm đăng bán</h3>
          </div>
          <div className="form-outline mb-3">
            <label className="form-label" htmlFor="post-category">
              Loại sản phẩm
            </label>
            <select
              className="form-select"
              aria-label="Disabled select example"
              required
              id="post-category"
              name="category"
              placeholder="Loại sản phẩm"
              disabled={true}
              value={postDetail.category_id}
            >
              {categoryData &&
                categoryData.map((data, index) => (
                  <option key={index} value={data.id}>
                    {data.value}
                  </option>
                ))}
            </select>
          </div>
          <form className="form-product" id="form-create-post">
            <div className="mb-3 mt-4">
              <h4>Thông tin chi tiết</h4>
            </div>
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="post-name">
                Tên sản phẩm&nbsp;<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="post-name"
                className="form-control"
                placeholder="Tên sản phẩm"
                name="name"
                defaultValue={postDetail.name}
                readOnly
              />
            </div>
            {Number(postInfor.category) < 3 && (
              <div className="row mb-3">
                <div className="col">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="post-brand">
                      Hãng sản xuất&nbsp;
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-select"
                      aria-label="Disabled select example"
                      name="brand"
                      id="post-brand"
                      value={postDetail.brand_id}
                      disabled={true}
                    >
                      <option>Hãng sản xuất</option>
                      {brandCategory &&
                        brandCategory.map((data, index) => (
                          <option key={index} value={data.id}>
                            {data.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="post-color">
                      Màu sắc
                    </label>
                    <input
                      type="text"
                      id="post-color"
                      className="form-control"
                      placeholder="Màu sắc"
                      name="color"
                      defaultValue={postDetail.color}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="row mb-3">
              <div className="col">
                <div className="form-outline">
                  <label className="form-label" htmlFor="post-status">
                    Tình trạng&nbsp;<span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    className="form-select"
                    aria-label="Disabled select example"
                    name="status"
                    id="post-status"
                    value={postDetail.status}
                    disabled={true}
                  >
                    <option value="0">Tình trạng</option>
                    {statusData.map((data, index) => (
                      <option key={index} value={data.id}>
                        {data.value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {Number(postInfor.category) < 3 && (
                <div className="col">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="post-guarantee">
                      Bảo hành
                    </label>
                    <input
                      type="number"
                      id="post-guarantee"
                      className="form-control"
                      placeholder="Thời gian bảo hành"
                      min={0}
                      defaultValue={postDetail.guarantee}
                      name="guarantee"
                      readOnly
                    />
                  </div>
                </div>
              )}
            </div>
            {Number(postInfor.category) > 1 && (
              <div className="row mb-3">
                <div className="col">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="post-cpu">
                      Bộ vi xử lý (CPU)
                    </label>
                    <input
                      type="text"
                      id="post-cpu"
                      className="form-control"
                      placeholder="Bộ vi xử lý"
                      name="cpu"
                      defaultValue={postDetail.cpu}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="post-gpu">
                      Card đồ họa (GPU)
                    </label>
                    <input
                      type="text"
                      id="post-gpu"
                      className="form-control"
                      placeholder="Card đồ họa dời"
                      name="gpu"
                      defaultValue={postDetail.gpu}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="row mb-3">
              <div className="col">
                <div className="form-outline">
                  <label className="form-label" htmlFor="post-ram">
                    Ram (GB)
                  </label>
                  <input
                    type="number"
                    id="post-ram"
                    className="form-control"
                    placeholder="Ram"
                    min={0}
                    defaultValue={postDetail.ram}
                    name="ram"
                    readOnly
                  />
                </div>
              </div>
              {Number(postInfor.category) == 2 && (
                <div className="col">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="post-display-size">
                      Kích thước màn hình
                    </label>
                    <input
                      type="number"
                      id="post-display-size"
                      className="form-control"
                      placeholder="Kích thước màn hính"
                      min={0}
                      defaultValue={postDetail.display_size}
                      name="display_size"
                      readOnly
                    />
                  </div>
                </div>
              )}
              {Number(postInfor.category) == 1 && (
                <div className="col">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="post-storage">
                      Dung lượng bộ nhớ
                    </label>
                    <select
                      className="form-select"
                      aria-label="Disabled select example"
                      name="storage"
                      id="post-storage"
                      value={postDetail.storage}
                      disabled={true}
                    >
                      <option value="0">Dung lượng bộ nhớ</option>
                      {storageData.map((data, index) => (
                        <option key={index} value={data.value}>
                          {`${data.value}GB`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
            {Number(postInfor.category) > 1 && (
              <div className="row mb-3">
                <div className="col">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="post-storage-type">
                      Loại ổ cứng
                    </label>
                    <select
                      className="form-select"
                      aria-label="Disabled select example"
                      name="storage_type"
                      id="post-storage-type"
                      value={postDetail.storage_type}
                      disabled={true}
                    >
                      <option>Loại ổ cứng</option>
                      {storageTypeData.map((data, index) => (
                        <option key={index} value={data.id}>
                          {data.value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="post-storage">
                      Dung lượng ổ cứng
                    </label>
                    <select
                      className="form-select"
                      aria-label="Disabled select example"
                      name="storage"
                      id="post-storage"
                      value={postDetail.storage}
                      disabled={true}
                    >
                      <option value="0">Dung lượng ổ cứng cứng</option>
                      {storageData.map((data, index) => (
                        <option key={index} value={data.value}>
                          {`${data.value}GB`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="post-address">
                Địa chỉ&nbsp;<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="post-address"
                className="form-control"
                placeholder="Chọn địa chỉ"
                value={address == "" ? postDetail.address : address}
                readOnly
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="freeCheckbox"
                defaultChecked={isFree}
                readOnly
              />
              <label className="form-check-label" htmlFor="freeCheckbox">
                Tặng miễn phí
              </label>
            </div>
            {!isFree && (
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="post-price">
                  Giá bán&nbsp;<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="number"
                  id="post-price"
                  min={0}
                  className="form-control"
                  placeholder="Giá bán"
                  name="price"
                  defaultValue={postDetail.price}
                  readOnly
                />
              </div>
            )}
            <div className="mb-3 mt-4">
              <h4>Tiêu đề và mô tả</h4>
            </div>
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="post-title">
                Tiêu đề&nbsp;<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="post-title"
                className="form-control"
                name="title"
                placeholder="Tiêu đề"
                defaultValue={postDetail.title}
                readOnly
              />
            </div>
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="post-description">
                Mô tả chi tiết&nbsp;<span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                className="form-control"
                id="post-description"
                rows="4"
                placeholder="Mô tả chi tiết
                  - Mua khi nào
                  - Trải nghiệm ra sao
                  - Có vấn đề nào khi sử dụng hay không"
                name="description"
                defaultValue={postDetail.description}
                readOnly
              ></textarea>
            </div>
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="post-public">
                Chế độ bài viết
              </label>
              <select
                className="form-select"
                aria-label="Disabled select example"
                required
                name="category"
                id="post-public"
                placeholder="Chế độ bài viết"
                value={postDetail.public_status}
                disabled={true}
              >
                <option value={1}>Công khai</option>
                <option value={0}>Riêng tư</option>
              </select>
            </div>
          </form>
          {/* ----------------------------------------------------------------------- */}
          <div className="mb-3 mt-4">
            <h4>Bạn muốn đổi sang sản phẩm khác</h4>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="tradeCheckbox"
              defaultChecked={isTrade}
              readOnly
            />
            <label className="form-check-label" htmlFor="tradeCheckbox">
              Đổi sản phẩm
            </label>
          </div>
          {isTrade && (
            <>
              <div className="mb-3">
                <h3>Thông tin sản phẩm muốn đổi</h3>
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="post-trade-category">
                  Loại sản phẩm
                </label>
                <select
                  className="form-select"
                  aria-label="Disabled select example"
                  required
                  id="post-trade-category"
                  name="category"
                  placeholder="Loại sản phẩm"
                  value={postTradeInfor.category_id}
                  disabled={true}
                >
                  {categoryData &&
                    categoryData.map((data, index) => (
                      <option key={index} value={data.id}>
                        {data.value}
                      </option>
                    ))}
                </select>
              </div>
              <form className="form-product" id="form-create-post">
                <div className="mb-3 mt-4">
                  <h4>Thông tin chi tiết</h4>
                </div>
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="post-trade-name">
                    Tên sản phẩm&nbsp;<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="post-trade-name"
                    className="form-control"
                    placeholder="Tên sản phẩm"
                    name="name"
                    defaultValue={postTradeInfor.name}
                    readOnly
                  />
                </div>
                <div className="mb-3 mt-4">
                  <h4>Tiêu đề và mô tả</h4>
                </div>
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="post-trade-title">
                    Tiêu đề&nbsp;<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="post-trade-title"
                    className="form-control"
                    name="title"
                    placeholder="Tiêu đề"
                    defaultValue={postTradeInfor.title}
                    readOnly
                  />
                </div>
                <div className="form-outline  mb-3">
                  <label className="form-label" htmlFor="post-trade-guarantee">
                    Bảo hành
                  </label>
                  <input
                    type="number"
                    id="post-trade-guarantee"
                    className="form-control"
                    placeholder="Thời gian bảo hành"
                    min={0}
                    defaultValue={postTradeInfor.guarantee}
                    name="guarantee"
                    readOnly
                  />
                </div>
                <div className="form-outline mb-3">
                  <label
                    className="form-label"
                    htmlFor="post-trade-description"
                  >
                    Mô tả chi tiết&nbsp;
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <textarea
                    className="form-control"
                    id="post-trade-description"
                    rows="4"
                    placeholder="Mô tả chi tiết
                  - Sản phẩm như thế nào
                  - Chất lượng ra sao
                  - Nhu cầu cụ thể như thế nào"
                    name="description"
                    defaultValue={postTradeInfor.description}
                    readOnly
                  ></textarea>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}