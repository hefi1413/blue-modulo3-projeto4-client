/*
https://drive.google.com/file/d/1EsAmSomx3Vb_UkdlG8dq0GC6jrfggUT2/view
https://drive.google.com/file/d/1NvhTvQdHO4CFlGckmPz3DvHvTFqUaWQz/view

  <div className="header__search">
    <input type="text" placeholder="Informe o ID..." id="search-input" />
    <button type="button" id="search-button"> <FontAwesomeIcon icon ={faMagnifyingGlass}> </FontAwesomeIcon> </button>
  </div>
*/

import './Home.css';
import PaletaLista from 'componentes/PaletaLista/PaletaLista';
import AdicionaEditaPaletaModal from 'componentes/AdicionaEditaPaletaModal/AdicionaEditaPaletaModal';
import DeletaPaletaModal from 'componentes/DeletaPaletaModal/DeletaPaletaModal';
import Navbar from 'componentes/Navbar/Navbar';
import { ActionMode } from '../constants/index';
import { useState } from 'react';

function Home() {
  const [modoAtual, setModoAtual] = useState(ActionMode.NORMAL);
  const [canShowAdicionaPaletaModal, setCanShowAdicionaPaletaModal] = useState(false);
  const [paletaParaAdicionar, setPaletaParaAdicionar] = useState();
  const [paletaParaEditar, setPaletaParaEditar] = useState();
  const [paletaEditada, setPaletaEditada] = useState();
  const [paletaParaDeletar, setPaletaParaDeletar] = useState();
  const [paletaRemovida, setPaletaRemovida] = useState();

  const handleActions = (action) => {
    const novaAcao = modoAtual === action ? ActionMode.NORMAL : action;
    setModoAtual(novaAcao);
  };

  const handleDeletePaleta = (paletaToDelete) => {
    setPaletaParaDeletar(paletaToDelete);
  };

  const handleUpdatePaleta = (paletaToUpdate) => {
    console.log('paletaParaEditar', paletaParaEditar);
    setPaletaParaEditar(paletaToUpdate);
    console.log('paletaParaEditar', paletaParaEditar);
    setCanShowAdicionaPaletaModal(true);
  };

  const handleCloseModal = () => {
    setCanShowAdicionaPaletaModal(false);
    setPaletaParaAdicionar();
    setPaletaParaDeletar();
    setPaletaParaEditar();
    setModoAtual(ActionMode.NORMAL);
  };

  return (
    <div className="Home">
      <Navbar
        mode={modoAtual}
        createPaleta={() => setCanShowAdicionaPaletaModal(true)}
        deletePaleta={() => handleActions(ActionMode.DELETAR)}
        updatePaleta={() => handleActions(ActionMode.ATUALIZAR)}
      />
      <div className="Home__container" id="home__container">
        <PaletaLista
          mode={modoAtual}
          paletaCriada={paletaParaAdicionar}
          paletaEditada={paletaEditada}
          paletaRemovida={paletaRemovida}
          updatePaleta={handleUpdatePaleta}
          deletePaleta={handleDeletePaleta}
        />
        {canShowAdicionaPaletaModal && (
          <AdicionaEditaPaletaModal
            mode={modoAtual}
            paletaToUpdate={paletaParaEditar}
            onUpdatePaleta={(paleta) => setPaletaEditada(paleta)}
            closeModal={handleCloseModal}
            onCreatePaleta={(paleta) => {
              setPaletaParaAdicionar(paleta);
            }}
          />
        )}
        {paletaParaDeletar && (
          <DeletaPaletaModal
            paletaParaDeletar={paletaParaDeletar}
            closeModal={handleCloseModal}
            onDeletePaleta={(paleta) => setPaletaRemovida(paleta)}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
