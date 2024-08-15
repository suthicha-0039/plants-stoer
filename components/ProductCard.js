"use client";
import Image from "next/image";
const ProductCard = ({ imageSrc, name, genre, price, addToCart }) => {
  return (
    <div className="border rounded shadow-md p-4">
      <Image
        src={imageSrc}
        alt={name}
        width={100}
        height={100}
        className="w-full h-fix object-cover rounded mb-2"
      />
      <h3 className="text-xl font-bold mb-4 text-center">{name}</h3>
      <div className="flex  justify-Aetween">
        <h3 className="text-xl font-bold mb-1">หมวด {genre}</h3>
        <p className="text-gray-600 mb-2 text-2xl font-bold">{price} บาท</p>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => addToCart({ imageSrc, name, price, quantity: 1 })}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          เพิ่มลงตะกร้า
        </button>
      </div>
    </div>
  );
};
export default ProductCard;
