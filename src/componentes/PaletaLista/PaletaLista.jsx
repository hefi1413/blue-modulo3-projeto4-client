import React, { useState, useEffect, useCallback } from 'react';

import './PaletaLista.css';

import { PaletaService } from '../../services/paletaServices';
import PaletaListaItem from './PaletaListaItem';
import PaletaDetalhesModal from '../PaletaDetalhesModal/PaletaDetalhesModal';
import { ActionMode } from 'constants/index';

function PaletaLista({
  paletaCriada,
  mode,
  updatePaleta,
  deletePaleta,
  paletaEditada,
  paletaRemovida,
}) {
  const [paletas, setPaletas] = useState([]);
  const [paletaSelecionada, setPaletaSelecionada] = useState({});
  const [paletaModal, setPaletaModal] = useState(false);

  const adicionarItem = (paletaIndex) => {
    const paleta = { [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) + 1 };
    setPaletaSelecionada({ ...paletaSelecionada, ...paleta });
  };

  const removerItem = (paletaIndex) => {
    const paleta = {
      [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) - 1,
    };
    setPaletaSelecionada({ ...paletaSelecionada, ...paleta });
  };

  const getLista = async () => {
    const response = await PaletaService.getLista();

    setPaletas(response);
  };

  const getPaletaById = async (paletaId) => {
    const response = await PaletaService.getById(paletaId);
    const mapper = {
      [ActionMode.NORMAL]: () => setPaletaModal(response),
      [ActionMode.ATUALIZAR]: () => updatePaleta(response),
      [ActionMode.DELETAR]: () => deletePaleta(response),
    };

    mapper[mode]();
  };

  const adicionaPaletaNaLista = useCallback(
    (paleta) => {
      const lista = [...paletas, paleta];
      setPaletas(lista);
    },
    [paletas],
  );

  useEffect(() => {
    /*     if (paletaCriada && !paletas.map(({ id }) => id).includes(paletaCriada.id)) {
      adicionaPaletaNaLista(paletaCriada);
 */ if (paletaCriada) {
      adicionaPaletaNaLista(paletaCriada);
    }
  }, [adicionaPaletaNaLista, paletaCriada, paletas]);

  useEffect(() => {
    getLista();
  }, [paletaEditada, paletaRemovida]);

  return (
    <div className="PaletaLista">
      {paletas.map((paleta, index) => (
        <PaletaListaItem
          mode={mode}
          key={`PaletaListaItem-${index}`}
          paleta={paleta}
          quantidadeSelecionada={paletaSelecionada[index]}
          index={index}
          onAdd={(index) => adicionarItem(index)}
          onRemove={(index) => removerItem(index)}
          clickItem={(paletaId) => getPaletaById(paletaId)}
        />
      ))}
      {paletaModal && (
        <PaletaDetalhesModal paleta={paletaModal} closeModal={() => setPaletaModal(false)} />
      )}
    </div>
  );
}

export default PaletaLista;
