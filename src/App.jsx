import React, { useState } from 'react';
import { Home } from 'lucide-react';
import { FaBoxes } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { GiMoneyStack } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import { Plus, X } from 'lucide-react';

const ProductInterface = () => {
  const [activeTab, setActiveTab] = useState("Campanas");
  const [isOpen, setIsOpen] = useState(false);
  const material = ['Material', 'Material', 'Material', 'Material', 'Material', 'Material'];
  const [isOpen2, setIsOpen2] = useState(false);
  const acabado = ['Acabado', 'Acabado', 'Acabado', 'Acabado', 'Acabado', 'Acabado'];
  const [isOpen3, setIsOpen3] = useState(false);
  const peso = ['Peso', 'Peso', 'Peso', 'Peso', 'Peso', 'Peso'];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [newElementValue, setNewElementValue] = useState('');

  const elementTypes = [
    { name: 'Material', placeholderText: 'Ingresa el material' },
    { name: 'Acabado', placeholderText: 'Describe el acabado' },
    { name: 'Peso', placeholderText: 'Ingresa el peso' }
  ];

  const handleAddNewElement = () => {
    if (selectedType && newElementValue) {
      console.log(`Nuevo ${selectedType}: ${newElementValue}`);
      setNewElementValue('');
      setSelectedType(null);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="bg-base text-white relative h-16">
        <nav className="container mx-auto flex items-center justify-between px-32 py-4">
          <button className='text-2xl font-serif w-40 flex justify-center'>
            <FaBoxes className='mr-2 mt-1' />Productos
          </button>
          <button className='text-2xl font-serif w-40 flex justify-center'>
            <BiSolidOffer className='mr-2 mt-1' />Ofertas
          </button>
          <button className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
            <button className="bg-white p-3 rounded-full">
              <Home className="h-6 w-6 text-base" />
            </button>
          </button>
          <button className='text-2xl font-serif w-40 flex justify-center'>
            <GiMoneyStack className='mr-2 mt-1' />Ventas
          </button>
          <button className='text-2xl font-serif w-40 flex justify-center'>
            <BiLogOut className='mr-2 mt-1' />Salir
          </button>
        </nav>
      </header>

      {/* Filtro */}
      <section className="py-3 mt-4 mb-4 flex justify-center space-x-6">
        {["Campanas", "Imágenes", "Orfebrería"].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-2 text-sm font-medium rounded-full transition ${
              activeTab === tab
                ? "bg-base text-white shadow-md"
                : "bg-white text-base border border-base hover:shadow"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}

        {/* Botón de nuevo elemento */}
        <button
          className='bg-base flex rounded-full text-white text-center absolute right-20'
          onClick={() => setIsModalOpen(true)}
        >
          <p className='pl-3 pt-[6px]'>Nuevo Elemento</p>
          <p className='bg-letras ml-2 w-10 h-10 rounded-full text-2xl flex items-center justify-center'>
            <Plus className='w-6 h-6' />
          </p>
        </button>
      </section>

      {/* Modal de nuevo elemento */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-[600px] p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Agregar Nuevo Elemento</h2>
            <div className="flex justify-center space-x-4 mb-6">
              {elementTypes.map((type) => (
                <button
                  key={type.name}
                  className={`px-6 py-2 rounded-full transition ${
                    selectedType === type.name
                      ? 'bg-base text-white'
                      : 'bg-white text-base border border-base hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedType(type.name)}
                >
                  {type.name}
                </button>
              ))}
            </div>
            {selectedType && (
              <div className="mb-6">
                <input
                  type={selectedType === 'Peso' ? 'number' : 'text'}
                  placeholder={elementTypes.find(t => t.name === selectedType)?.placeholderText}
                  value={newElementValue}
                  onChange={(e) => setNewElementValue(e.target.value)}
                  className="w-full px-4 py-2 border border-base rounded-full"
                />
              </div>
            )}
            <div className="text-center">
              <button
                className={`px-6 py-2 rounded-full text-white ${
                  selectedType && newElementValue
                    ? 'bg-base'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                onClick={handleAddNewElement}
                disabled={!selectedType || !newElementValue}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contenedor de elementos */}
      <div className="container px-4 flex items-center justify-center">
        <div className="bg-gray-200 w-[80%] h-96 rounded-lg grid grid-cols-3 gap-4 pl-8">
        <div className="relative w-72 pt-2">
          <button onClick={() => setIsOpen(!isOpen)} className="w-full bg-white border border-base rounded-full px-6 py-2 text-black flex justify-between items-center">
          Material
            <div className={`w-6 h-6 rounded-full border border-base flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
              <div className="w-0 h-0 border-t-[6px] border-t-base border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent" />
            </div>
          </button>
          <ul className={`absolute z-10 w-full bg-white border border-base rounded-lg mt-1 shadow-lg transform origin-top transition-all duration-300 ease-in-out
          ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 h-0'}`}>
            {material.map((material) => (
              <li key={material} className="px-4 py-2 hover:bg-base hover:text-white cursor-pointer"
              onClick={() => { setIsOpen(false); }}> {material}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative w-72 pt-2">
          <button onClick={() => setIsOpen2(!isOpen2)} className="w-full bg-white border border-base rounded-full px-6 py-2 text-black flex justify-between items-center">
          Acabado
            <div className={`w-6 h-6 rounded-full border border-base flex items-center justify-center transition-transform duration-300 ${isOpen2 ? 'rotate-180' : ''}`}>
              <div className="w-0 h-0 border-t-[6px] border-t-base border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent" />
            </div>
          </button>
          <ul className={`absolute z-10 w-full bg-white border border-base rounded-lg mt-1 shadow-lg transform origin-top transition-all duration-300 ease-in-out
          ${isOpen2 ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 h-0'}`}>
            {acabado.map((acabado) => (
              <li key={acabado} className="px-4 py-2 hover:bg-base hover:text-white cursor-pointer"
              onClick={() => { setIsOpen2(false); }}> {acabado}
              </li>
            ))}
          </ul>
        </div> 

        <div className="relative w-72 pt-2">
          <button onClick={() => setIsOpen3(!isOpen3)} className="w-full bg-white border border-base rounded-full px-6 py-2 text-black flex justify-between items-center">
          Peso
            <div className={`w-6 h-6 rounded-full border border-base flex items-center justify-center transition-transform duration-300 ${isOpen3 ? 'rotate-180' : ''}`}>
              <div className="w-0 h-0 border-t-[6px] border-t-base border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent" />
            </div>
          </button>
          <ul className={`absolute z-10 w-full bg-white border border-base rounded-lg mt-1 shadow-lg transform origin-top transition-all duration-300 ease-in-out
          ${isOpen3 ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 h-0'}`}>
            {peso.map((peso) => (
              <li key={peso} className="px-4 py-2 hover:bg-base hover:text-white cursor-pointer"
              onClick={() => { setIsOpen3(false); }}> {peso}
              </li>
            ))}
          </ul>
        </div> 
        </div>
      </div>
    </div>
  );
};

export default ProductInterface;
