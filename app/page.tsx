"use client";

import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// const BASE_URL = "https://w06-p01.vercel.app/api/products";
// const BASE_URL = "https://script.google.com/macros/s/AKfycbxeG2w-NCSL0gfIKF-YNQufSujgVUPt1tjcWvnxc_0LfJ6b42eRy2TVratiSi4kdeuCPw/exec?sheetName=items"
  const BASE_URL = process.env.NEXT_PUBLIC_WEB_APP_URL+"?sheetName=items";
interface Product {
  pid: string;
  name: string;
  genre: string;
  price: Number;
  taxRate: Number;
  quantity: Number;
  imageSrc: string;
}

interface CartItem extends Product {
  id: number;
}

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [nextItemId, setNextItemId] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);

  async function getProducts() {
    const res = await fetch(BASE_URL);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const result = await res.json();
    // console.log(result)
    setProducts(result);
  }

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, { ...product, id: nextItemId }]);
    setNextItemId(nextItemId + 1);
  };

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) =>
        total + (item.price as number) * (item.quantity as number),
      0
    );
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-between p-4">
        <h1 className="text-4xl font-bold">Plants Store</h1>
        <div className="flex gap-2">
          {/* -------------------ตะกร้าสินค้า-----------------------------------  */}
          <div className="sticky top-20 z-10 mt-4 w-[35%] h-full bg-zinc-300 p-2 rounded-lg border-2 border-cyan-500">
            <h2 className="text-2xl font-bold mb-4">ตะกร้าสินค้า</h2>
            <table className="w-full table-auto bg-zinc-200">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-4 py-2">รายการ</th>
                  <th className="px-4 py-2">ราคา</th>
                  <th className="px-4 py-2">จำนวน</th>
                  <th className="px-4 py-2 text-right">เป็นเงิน</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="flex  px-4 py-2">
                      <Image
                        src={item.imageSrc}
                        alt={item.name}
                        width={20}
                        height={20}
                        className="w-20 h-20"
                      />
                      <span className="ml-2">{item.name}</span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      {item.price as number}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity as number}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                        className="w-10 text-right"
                      />
                    </td>
                    <td className="px-4 py-2 text-right ">
                      {(
                        (item.price as number) * (item.quantity as number)
                      ).toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end items-center bg-slate-400">
              <div className="py-2 text-right font-bold">รวมเงิน:</div>
              <div className="px-4 py-2 font-bold text-2xl">
                {calculateTotal().toFixed(2)}
              </div>
            </div>
          </div>
          {/* -------------------จบตะกร้าสินค้า--------------------------  */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-lg mt-4 border-2 border-cyan-500">
            {products.map((product: Product) => (
              <ProductCard
                key={product.pid}
                imageSrc={product.imageSrc}
                name={product.name}
                genre={product.genre}
                price={product.price}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
