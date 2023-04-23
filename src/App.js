import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import NewLogin from "./Screens/NewLogin";
import Books from "./Screens/Books";
import Navigation from "./Components/Navigation";
import instance from "./api/book2up";
import store from "./Store/store";
import { setBooks } from "./Store/slices/booksSlice";
import { setCart } from "./Store/slices/cartSlice";
import { setHistory } from "./Store/slices/historySlice";
import BookDetails from "./Screens/BookDetails";
import Cart from "./Screens/Cart";
import History from "./Screens/History";
import LoadingSpinner from "./Components/LoadingSpinner";
function App() {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await instance.get("/bookdata");
        store.dispatch(setBooks(response.data));
        const cart = await instance.get("/cartdata");
        store.dispatch(setCart(cart.data.length === 0 ? null : cart.data));
        const purchaseHistory = await instance.get("/purchase-history");
        store.dispatch(setHistory(purchaseHistory.data));
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    if (token) {
      getData();
    }
  }, [token]);
  if (!token) {
    return (
      <div className="">
        <Routes>
          <Route path="*" element={<NewLogin />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div className="">
        {loading ? (
          <LoadingSpinner centered />
        ) : (
          <div className="Aaapp">
            <Navigation />
            <Routes>
              <Route exact path="/" element={<Books />} />
              <Route exact path="/book/:id" element={<BookDetails />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route exact path="/history" element={<History />} />
            </Routes>
          </div>
        )}
      </div>
    );
  }
}

export default App;
