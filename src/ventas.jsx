import React, { useState } from 'react';
import { Home } from 'lucide-react';
import { FaBoxes } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import { Plus, ChevronRight } from 'lucide-react';
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaAngleDoubleDown } from "react-icons/fa";

const Ventas = () => {
  const [activeTab, setActiveTab] = useState("En Proceso");
  const [modalNuevoTrabajo, setModalNuevoTrabajo] = useState(false);
  const [trabajosEnProceso, setTrabajosEnProceso] = useState([]);
  const [trabajosTerminados, setTrabajosTerminados] = useState([]);
  const [trabajoSeleccionado, setTrabajoSeleccionado] = useState(null);

  const [nuevoTrabajo, setNuevoTrabajo] = useState({
    fecha: '',
    cliente: '',
    lugar: '',
    organizacion: '',
    descripcion: '',
    costoFinal: ''
  });

  // Función para añadir un nuevo trabajo
  const handleNuevoTrabajo = () => {
    const trabajoNuevo = { ...nuevoTrabajo };
    setTrabajosEnProceso([...trabajosEnProceso, trabajoNuevo]);
    setModalNuevoTrabajo(false);
    setNuevoTrabajo({
      fecha: '',
      cliente: '',
      lugar: '',
      organizacion: '',
      descripcion: '',
      costoFinal: ''
    });
  };

  // Mover trabajo a terminados
  const terminarTrabajo = (trabajo) => {
    setTrabajosTerminados([...trabajosTerminados, { ...trabajo, costoFinal: '' }]);
    setTrabajosEnProceso(trabajosEnProceso.filter(t => t !== trabajo));
  };

  // Ocultar detalles de un trabajo
  const toggleDetallesTrabajo = (trabajo) => {
    setTrabajoSeleccionado(trabajo === trabajoSeleccionado ? null : trabajo);
  };

  return (
    <div>
      {/* Navbar */}
      <header className="bg-base text-white relative h-16">
        <nav className="container mx-auto flex items-center justify-between px-32 py-2">
          <button className="items-center">
            <button className="bg-white hover:bg-letras p-3 rounded-full">
              <Home className="h-6 w-6 text-base" />
            </button>
          </button>
          <button className='text-2xl font-serif w-40 flex justify-center hover:text-letras'>
            <FaBoxes className='mr-2 mt-1' />Productos
          </button>
          <button className='text-2xl font-serif w-40 flex justify-center text-letras'>
            <GiMoneyStack className='mr-2 mt-1' />Ventas
          </button>
          <button className='text-2xl font-serif w-40 flex justify-center hover:text-letras'>
            <BiLogOut className='mr-2 mt-1' />Salir
          </button>
        </nav>
      </header>

      {/* Filtro */}
      <section className="py-3 mt-4 mb-4 flex justify-center space-x-6">
        {["En Proceso", "Hechas"].map((tab) => (
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
        <button
          className='bg-base flex rounded-full text-white text-center absolute right-20'
          onClick={() => setModalNuevoTrabajo(true)}
        >
          <p className='pl-3 pt-[6px]'>Nuevo Trabajo</p>
          <p className='bg-letras ml-2 w-10 h-10 rounded-full text-2xl flex items-center justify-center'>
            <Plus className='w-6 h-6' />
          </p>
        </button>
      </section>

      {/* Lista de Trabajos */}
      <div className="p-3 rounded-xl ml-48 mt-5 bg-div w-[70%] h-[400px] justify-center">
        {activeTab === "En Proceso" ? (
          trabajosEnProceso.map((trabajo, index) => (
            <div key={index} className="bg-white rounded my-2 p-4 relative">
              <div className="flex justify-between items-center">
                <div>
                  <p className='flex'>Trabajo de la fecha <p className='text-base ml-3'>{trabajo.fecha}</p> </p>
                </div>
                <button onClick={() => toggleDetallesTrabajo(trabajo)}>
                  <FaAngleDoubleDown />
                </button>
                <button className='bg-base rounded-xl' onClick={() => terminarTrabajo(trabajo)}>
                  <p className='m-[5px] text-white hover:text-letras flex'>Trabajo Terminado <FaArrowAltCircleRight className='ml-2 mt-1' /></p>
                </button>
              </div>
              {trabajoSeleccionado === trabajo && (
                <div className="mt-4 bg-white p-4 rounded flex justify-between">
                  <p>Cliente: <p className='text-base'>{trabajo.cliente}</p></p>
                  <p>Lugar: <p className='text-base'>{trabajo.lugar}</p> </p>
                  <p>Organización: <p className='text-base'>{trabajo.organizacion}</p> </p>
                  <p>Descripción: <p className='text-base'>{trabajo.descripcion}</p> </p>
                </div>
              )}
            </div>
          ))
        ) : (
          trabajosTerminados.map((trabajo, index) => (
            <div key={index} className="bg-white rounded my-2 p-4 relative">
              <div className="flex items-center">
                <div>
                  <p className='flex'>Trabajo de la fecha <p className='text-base ml-3'>{trabajo.fecha}</p> </p>
                </div>
                <button onClick={() => toggleDetallesTrabajo(trabajo)}>
                  <FaAngleDoubleDown className='ml-72' />
                </button>
              </div>
              {trabajoSeleccionado === trabajo && (
                <div className="mt-4 bg-white p-4 rounded flex justify-between">
                  <p>Cliente: <p className='text-base'>{trabajo.cliente}</p></p>
                  <p>Lugar: <p className='text-base'>{trabajo.lugar}</p> </p>
                  <p>Organización: <p className='text-base'>{trabajo.organizacion}</p> </p>
                  <p>Descripción: <p className='text-base'>{trabajo.descripcion}</p> </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Modal Nuevo Trabajo */}
      {modalNuevoTrabajo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 h-[450px]">
            <h2 className="text-xl text-center mb-4 text-base">Nuevo Trabajo</h2>
            <input name="fecha" placeholder="Fecha de inicio" value={nuevoTrabajo.fecha}
              onChange={(e) => setNuevoTrabajo({ ...nuevoTrabajo, fecha: e.target.value })} className="w-full mb-2 p-2 border border-base rounded" />

            <input name="cliente" placeholder="Cliente" value={nuevoTrabajo.cliente}
              onChange={(e) => setNuevoTrabajo({ ...nuevoTrabajo, cliente: e.target.value })} className="w-full mb-2 p-2 border border-base rounded" />

            <input name="lugar" placeholder="Lugar" value={nuevoTrabajo.lugar}
              onChange={(e) => setNuevoTrabajo({ ...nuevoTrabajo, lugar: e.target.value })} className="w-full mb-2 p-2 border border-base rounded" />

            <input name="organizacion" placeholder="Organizacion" value={nuevoTrabajo.organizacion}
              onChange={(e) => setNuevoTrabajo({ ...nuevoTrabajo, organizacion: e.target.value })} className="w-full mb-2 p-2 border border-base rounded" />

            <input name="descripcion" placeholder="Descripcion" value={nuevoTrabajo.descripcion}
              onChange={(e) => setNuevoTrabajo({ ...nuevoTrabajo, descripcion: e.target.value })} className="w-full mb-2 p-2 border border-base rounded" />

            <input name="costo" placeholder="Costo del Trabajo" value={nuevoTrabajo.costoFinal}
              onChange={(e) => setNuevoTrabajo({ ...nuevoTrabajo, costoFinal: e.target.value })} className="w-full mb-2 p-2 border border-base rounded" />

            <div className="flex justify-end space-x-2 mt-5">
              <button 
                onClick={() => setModalNuevoTrabajo(false)}
                className="bg-letras text-white p-2 rounded"
              >
                Cancelar
              </button>
              <button 
                onClick={handleNuevoTrabajo}
                className="bg-base text-white p-2 rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ventas;