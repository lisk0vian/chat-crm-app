import html2canvas from 'html2canvas-pro';

export const useExportToPng = () => {
  const exportPng = async (elementId: string, filename = 'dashboard.png') => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    // Crear un enlace para descargar la imagen
    const link = document.createElement('a');
    link.href = imgData;
    link.download = filename;
    link.click();
  };

  return { exportPng }
};
