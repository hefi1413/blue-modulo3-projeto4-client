import { baseURL } from '../assets/modules/env.js';

const PaletaContext = {
  paletaEndpoint: () => baseURL,
  paletaLista: () => `${PaletaContext.paletaEndpoint()}/all-paletas`,
  paletaById: (id) => `${PaletaContext.paletaEndpoint()}/one-paleta/${id}`,
  createPaleta: () => `${PaletaContext.paletaEndpoint()}/create-paleta`,
  updatePaletaById: (id) => `${PaletaContext.paletaEndpoint()}/update-paleta/${id}`,
  deletePaletaById: (id) => `${PaletaContext.paletaEndpoint()}/delete-paleta/${id}`,
};

export const Api = {
  ...PaletaContext,
};
