import './Navbar.css';

import { ActionMode } from 'constants/index';

import sacola from '../../assets/images/icons/sacola.svg';
import logo from '../../assets/images/logo.svg';
import paleta from '../../assets/images/icons/paleta.svg';
import atualizar from '../../assets/images/icons/atualizar.svg';
import deletar from '../../assets/images/icons/deletar.svg';

function Navbar({ createPaleta, updatePaleta, deletePaleta, mode }) {
  return (
    <div className="Header">
      <div className="row">
        <div className="Header__logo Logo">
          <img src={logo} width="70px" alt="Logo El Geladon" className="Logo__icone" />
          <span className="Logo__titulo"> El Geladon </span>
        </div>
        <div className="Header__opcoes Opcoes">
          <button
            type="button"
            className={`Opcoes__paleta Paleta ${mode === ActionMode.ATUALIZAR && 'Paleta--ativa'}`}
            onClick={() => updatePaleta()}
          >
            <img src={atualizar} width="40px" className="Paleta__icone" alt="Editar paleta" />
          </button>
          <button
            type="button"
            className={`Opcoes__paleta Paleta ${mode === ActionMode.DELETAR && 'Paleta--deletar'}`}
            onClick={() => deletePaleta()}
          >
            <img src={deletar} width="40px" className="Paleta__icone" alt="Deletar paleta" />
          </button>
          <button type="button" className="Opcoes__paleta Paleta" onClick={() => createPaleta()}>
            <img src={paleta} width="40px" className="Paleta__icone" alt="Adiconar paleta" />
          </button>
          <div className="Opcoes__sacola Sacola">
            <img src={sacola} width="40px" className="Sacola__icone" alt="Sacola de compras" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
