import CardNoticiasComponent from "../component/CardNoticiasComponent";

const ProgramasComponent = () => {
    const noticiasData = [
    {
      id: 1,
      imageSrc: "https://i.ibb.co/JBCJMNj/adminitracionsistemasinformaticos1.png",
      title: "Administracios de sistemas informaticos",
      buttonText: "Más información",
      buttonLink: "https://sco2.org/18ccc/",
    },
  ];

  return (
    <div>
      {noticiasData.map((noticia) => (
        <CardNoticiasComponent
          key={noticia.id}
          imageSrc={noticia.imageSrc}
          title={noticia.title}
          buttonText={noticia.buttonText}
          buttonLink={noticia.buttonLink}
        />
      ))}
    </div>
  );
};

export default ProgramasComponent;
