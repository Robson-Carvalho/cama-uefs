// @ts-ignore
import edital2024 from "@/assets/public_notices/EDITAL_PIBEX_01_2024.pdf";
// @ts-ignore
import edital2025 from "@/assets/public_notices/EDITAL_PIBEX_01_2025_GERAL.pdf";
// @ts-ignore
import workPlan from "@/assets/work_plan/SISTEX - UEFS.pdf";

export const projectDocuments = [
  {
    id: 1,
    title: "Edital PIBEX 01/2024",
    description: "Edital de aprovação e fomento inicial do projeto de extensão para a criação da plataforma.",
    file: edital2024,
    type: "Edital"
  },
  {
    id: 2,
    title: "Edital PIBEX 01/2025",
    description: "Edital de renovação e continuidade das atividades do projeto com a comunidade escolar.",
    file: edital2025,
    type: "Edital"
  },
  {
    id: 3,
    title: "Plano de Trabalho (SISTEX)",
    description: "Documento oficial detalhando as metas, metodologia e cronograma de atividades do bolsista e da equipe.",
    file: workPlan,
    type: "Plano de Trabalho"
  }
];
