import './AdicionaEditaPaletaModal.css';

import { useState, useEffect } from 'react';

import Modal from '../Modal/Modal';
import { PaletaService } from '../../services/paletaServices';
import { ActionMode } from 'constants/index';

function AdicionaEditaPaletaModal({
  closeModal,
  onCreatePaleta,
  mode,
  paletaToUpdate,
  onUpdatePaleta,
}) {
  const form = {
    preco: paletaToUpdate?.preco ?? '',
    sabor: paletaToUpdate?.sabor ?? '',
    recheio: paletaToUpdate?.recheio ?? '',
    descricao: paletaToUpdate?.descricao ?? '',
    foto: paletaToUpdate?.foto ?? '',
  };

  const handleSend = async () => {
    const renomeiaCaminhoFoto = (fotoPath) => {
      let index = fotoPath.lastIndexOf('\\');
      if (index > -1) {
        return fotoPath.substr(index + 1);
      }

      index = fotoPath.lastIndexOf('/');
      if (index > -1) {
        return fotoPath.substr(index + 1);
      }
      return fotoPath;
    };

    const { sabor, recheio, descricao, preco, foto } = state;
    const titulo = sabor + (recheio && ' com ' + recheio);

    const paleta = {
      titulo,
      sabor,
      descricao,
      preco: parseFloat(preco),
      foto: `assets/images/${renomeiaCaminhoFoto(foto)}`,
    };

    const serviceCall = {
      [ActionMode.NORMAL]: () => PaletaService.create(paleta),
      [ActionMode.ATUALIZAR]: () => PaletaService.updtateById(paletaToUpdate?.id, paleta),
    };

    const response = await serviceCall[mode]();

    const actionResponse = {
      [ActionMode.NORMAL]: (response) => onCreatePaleta(response),
      [ActionMode.ATUALIZAR]: (response) => onUpdatePaleta(response),
    };

    actionResponse[mode](response);

    const reset = {
      preco: '',
      sabor: '',
      recheio: '',
      descricao: '',
      foto: '',
    };

    setState(reset);
    closeModal();
  };

  const [canDisable, setCanDisable] = useState(true);

  const canDisableSendButton = () => {
    const response = !Boolean(
      state.descricao.length &&
        state.foto.length &&
        state.sabor.length &&
        String(state.preco).length,
    );
    setCanDisable(response);
  };

  useEffect(() => {
    canDisableSendButton();
  });

  const [state, setState] = useState(form);

  const handleChange = (e, name) => {
    setState({ ...state, [name]: e.target.value });
  };

  return (
    <Modal closeModal={closeModal}>
      <div className="AdicionaEditaPaletaModal">
        <form autoComplete="off">
          <h2> {ActionMode.ATUALIZAR === mode ? 'Atualizar' : 'Adicionar ao'} Cardápio </h2>
          <div>
            <label className="AdicionaPaletaModal__text" htmlFor="preco">
              {' '}
              Preco:{' '}
            </label>
            <input
              id="preco"
              placeholder="10,00"
              type="text"
              value={state.preco}
              onChange={(e) => handleChange(e, 'preco')}
            />
          </div>
          <div>
            <label className="AdicionaPaletaModal__text" htmlFor="sabor">
              {' '}
              Sabor:{' '}
            </label>
            <input
              id="sabor"
              placeholder="Chocolate"
              type="text"
              value={state.sabor}
              onChange={(e) => handleChange(e, 'sabor')}
            />
          </div>
          <div>
            <label className="AdicionaPaletaModal__text" htmlFor="recheio">
              {' '}
              Recheio:{' '}
            </label>
            <input
              id="recheio"
              placeholder="Banana"
              type="text"
              value={state.recheio}
              onChange={(e) => handleChange(e, 'recheio')}
            />
          </div>
          <div>
            <label className="AdicionaPaletaModal__text" htmlFor="descricao">
              {' '}
              Descricao:{' '}
            </label>
            <input
              id="descricao"
              placeholder="Detalhe o produto"
              type="text"
              value={state.descricao}
              onChange={(e) => handleChange(e, 'descricao')}
            />
          </div>
          <div>
            <label
              className="AdicionaPaletaModal__text  AdicionaPaletaModal__foto-label"
              htmlFor="foto"
            >
              {!state.foto.length ? 'Selecionar Imagem' : state.foto}
            </label>
            <input
              className="AdicionaPaletaModal__foto"
              id="foto"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) => handleChange(e, 'foto')}
              required
            />
          </div>

          <button
            className="AdicionaPaletaModal__enviar"
            type="button"
            disabled={canDisable}
            onClick={handleSend}
          >
            {ActionMode.NORMAL === mode ? 'Enviar' : 'Atualizar'}
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AdicionaEditaPaletaModal;
