import { getTotalInfo } from "../../../calculator/getInfo.js";
import {getPalletPlan} from "../../../calculator/getPalletPlan.js";

export async function createPdf(projectSolution) {
    if (!projectSolution?.totals) {
        throw new Error("Сначала выполните расчёт забора");
    }

    // Загружаем библиотеку и шрифты при вызове функции.
    const pdfmakeModule = await import("pdfmake/build/pdfmake.js");
    const fontsModule = await import("pdfmake/build/vfs_fonts.js");

    const pdfmake = pdfmakeModule.default;

    pdfmake.addVirtualFileSystem(fontsModule.default);

    const { totalResult, totalBlocks, cuttedblocksInfo } = getTotalInfo(projectSolution);

    const docDefinition = {
        defaultStyle: {
            font: "Roboto",
        },

        content: [
            // шапка
            {
                text: "АРКА",
                fontSize: 34,
                color: "red",
                alignment: "center",
                bold: true,
            },
            {
                text: "Расчёт забора",
                style: 'header',
                alignment: "center",
            },
            // параметры забора
            {
                text: "Параметры забора",
                style: 'subheader',
            },
            {
                margin: [0, 10, 0, 16],
                canvas: [
                    {
                        type: "line",
                        x1: 0,
                        y1: 0,
                        x2: 500,
                        y2: 0,
                        lineWidth: 2,
                        lineColor: "#2563EB",
                    },
                ],
            },
            // таблица с параметрами забора
            {
			style: 'tableExample',
			table: {
                body: totalResult.map(({ label, value,unit }) => [label, String(value),unit]),
            },
			},
            // количество блоков
            {
              margin: [0, 10, 0, 16],
            },
            {
                text: "Количество блоков",
                style: 'subheader',
            },
            {
                margin: [0, 10, 0, 16],
                canvas: [
                    {
                        type: "line",
                        x1: 0,
                        y1: 0,
                        x2: 500,
                        y2: 0,
                        lineWidth: 2,
                        lineColor: "#2563EB",
                    },
                ],
            },
            {
			style: 'tableExample',
			table: {
                body: totalBlocks.map(({ label, value }) => [label, String(value), "шт."]),
            },
			},

        ],
    };

    await pdfmake
        .createPdf(docDefinition)
        .download("raschet-zabora.pdf");
}