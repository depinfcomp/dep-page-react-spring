import { Docentes, Administrativos } from "../component/DocAdmiComponent.jsx";

const DocentesPage = () => {
  return (
    <>
      <div className="fcen-section-heading">
        <p style={{ fontSize: "60px" }}>Adminitrativos</p>
      </div>
      <Administrativos />
      <div className="fcen-section-heading">
        <p style={{ fontSize: "60px" }}>Docentes</p>
      </div>
      <div style={{marginBottom: '20'}}>
        <Docentes />
      </div>
    </>
  );
};

export default DocentesPage;
