import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";

import OrderModal from "../../components/OrderModal";
import Pagination from "../../components/Pagination";
import DeleteModal from "../../components/DeleteModal";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  // type: 決定 modal 展開的用途

  const [tempOrder, setTempOrder] = useState({});

  const orderModal = useRef(null);
  const deleteModal = useRef(null);

  useEffect(() => {
    orderModal.current = new Modal("#orderModal", {
      backdrop: "static",
    });
    deleteModal.current = new Modal("#deleteModal");

    getOrders();
  }, []);

  const getOrders = async (page = 1) => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders?page=${page}`
    );
    setOrders(res.data.orders);
    setPagination(res.data.pagination);
  };

  const openOrderModal = (order) => {
    setTempOrder(order);
    orderModal.current.show();
  };
  const closeOrderModal = () => {
    setTempOrder({});
    orderModal.current.hide();
  };

  const openDeleteModal = (order) => {
    setTempOrder(order);
    deleteModal.current.show();
  };

  const closeDeleteModal = () => {
    deleteModal.current.hide();
  };

  const deleteOrder = async (id) => {
    try {
      const res = await axios.delete(
        `v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${id}`
      );
      if (res.data.success) {
        getOrders();
        deleteModal.current.hide();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3">
      <OrderModal
        closeProductModal={closeOrderModal}
        getOrders={getOrders}
        tempOrder={tempOrder}
      />
      <DeleteModal
        close={closeDeleteModal}
        text={tempOrder.id}
        handleDelete={deleteOrder}
        id={tempOrder.id}
      />
      <h3>訂單列表</h3>
      <hr />
      <div className="text-end">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => openOrderModal("create", {})}
        >
          建立新商品
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">訂單 id</th>
            <th scope="col">購買用戶</th>
            <th scope="col">訂單金額</th>
            <th scope="col">付款狀態</th>
            <th scope="col">付款日期</th>
            <th scope="col">留言訊息</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                  {order.user?.name}
                  {order.user?.email}
                </td>
                <td>${order.total}</td>
                <td>
                  {order.is_paid ? (
                    <span className="text-success fw-bold">付款完成</span>
                  ) : (
                    "未付款"
                  )}
                </td>
                <td>
                  {order.paid_date
                    ? new Date(order.paid_date * 1000).toLocaleString()
                    : "未付款"}
                </td>
                <td>{order.message}</td>

                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      openOrderModal(order);
                    }}
                  >
                    查看
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={() => openDeleteModal(order)}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination pagination={pagination} changePage={getOrders} />
    </div>
  );
};

export default AdminOrders;
