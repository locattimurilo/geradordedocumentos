const templates = { dfd: null, etp: null, tr: null };
const carregados = { dfd: false, etp: false, tr: false };
const abasCarregadas = { dfd: false, etp: false, tr: false };

const campos = {
    dfd: {
        agente: 'agente',
        setor: 'setor',
        processo: 'processo',
        dotacao: 'dotacao',
        fonte_recurso: 'fonte_recurso',
        objeto: 'objeto',
        justificativa: 'justificativa',
        especificacoes: 'especificações',
        data: 'data',
        cargo: 'cargo'
    },
    etp: {
        introducao: 'introducao',
        objeto: 'objeto',
        justificativa: 'justificativa',
        requisitos: 'requisitos',
        valor_estimado: 'valor-estimado',
        prazo_execucao: 'prazo-execucao',
        data: 'data',
        agente: 'agente',
        descricao_necessidade: 'descricao_necessidade',
        estimativa_quantidade: 'estimativa_quantidade',
        estimativa_valores: 'estimativa_valores',
        parcelamento: 'parcelamento',
        justificativa_parcelamento: 'justificativa_parcelamento',
        viabilidade: 'viabilidade',
        manifestacao: 'manifestacao',
        solicitante: 'solicitante',
        setor: 'setor'
    },
    tr: {
        resumo_contratacao: 'resumo_contratacao',
        vigencia: 'vigencia',
        requisitos: 'requisitos',
        endereco: 'endereço',
        criterios: 'criterios',
        tipo: 'tipo',
        data: 'data',
        agente: 'agente',
        cargo: 'cargo'
    }
};

async function carregarPainel(tipo) {
    if (abasCarregadas[tipo]) return; 

    try {
        const res = await fetch(`${tipo.toUpperCase()}.html`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        
        const html = await res.text();
        document.getElementById(tipo).innerHTML = html;
        abasCarregadas[tipo] = true;
        
          if (tipo === 'tr') {
            resetarItensTR();
        }
    } catch (err) {
        document.getElementById(tipo).innerHTML = `<p style="color:red;padding:20px;">Erro ao carregar ${tipo.toUpperCase()}.html: ${err.message}</p>`;
    }
}

window.mudarAba = function(ev, tipo) {
    document.querySelectorAll('.painel').forEach(p => p.classList.remove('ativo'));
    document.querySelectorAll('.aba').forEach(a => a.classList.remove('ativa'));
    
    document.getElementById(tipo).classList.add('ativo');
    ev.currentTarget.classList.add('ativa');
    
    carregarPainel(tipo);
};

window.lidarArquivo = function(tipo) {
    const arquivo = document.getElementById(`file-${tipo}`).files[0];
    if (!arquivo) return;

    const leitor = new FileReader();
    leitor.onload = function(e) {
        templates[tipo] = e.target.result;
        carregados[tipo] = true;

        const span = document.getElementById(`status-${tipo}`);
        span.textContent = `✅ ${arquivo.name}`;
        span.classList.add('ok');
        document.getElementById(`erro-${tipo}`).style.display = 'none';
    };
    leitor.readAsArrayBuffer(arquivo);
};

async function carregarTemplate(tipo, caminho) {
    try {
        const r = await fetch(caminho);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);

        templates[tipo] = await r.arrayBuffer();
        carregados[tipo] = true;

        document.getElementById(`erro-${tipo}`).style.display = 'none';
        const span = document.getElementById(`status-${tipo}`);
        span.textContent = `✅ ${tipo.toUpperCase()}.docx (automático)`;
        span.classList.add('ok');
    } catch(e) {
        document.getElementById(`erro-${tipo}`).style.display = 'block';
    }
}

function baixarBlob(blob, nome) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nome;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

let contadorItensTR = 0;

function htmlItemTR(idx) {
    return `
    <div class="item-tr" id="item-tr-${idx}">
        <div class="item-numero">Item ${idx + 1}</div>
        <button type="button" class="btn-remover" onclick="removerItemTR(${idx})">✕ Remover</button>

        <div class="tres-colunas">
            <div class="campo">
                <label>Especificação</label>
                <textarea name="especificacao_${idx}" data-item="${idx}" data-campo="especificacao" rows="3" placeholder="Ex: item tamanho x, cor y..."></textarea>
            </div>
            <div class="campo">
                <label>Unidade</label>
                <input type="text" name="unidade_${idx}" data-item="${idx}" data-campo="unidade" placeholder="Ex: Un.">
            </div>
            <div class="campo">
                <label>Quantidade</label>
                <input type="text" name="quantidade_${idx}" data-item="${idx}" data-campo="quantidade" placeholder="Ex: 02">
            </div>
        </div>

        <div class="duas-colunas">
            <div class="campo">
                <label>Valor Unitário (R$)</label>
                <input type="text" name="valor_unitario_${idx}" data-item="${idx}" data-campo="valor_unitario" placeholder="Ex: 150,00">
            </div>
            <div class="campo">
                <label>Valor Total (R$)</label>
                <input type="text" name="valor_total_${idx}" data-item="${idx}" data-campo="valor_total" placeholder="Ex: 300,00">
            </div>
        </div>
    </div>`;
}

window.adicionarItemTR = function() {
    const container = document.getElementById('lista-itens-tr');
    if (!container) return; // Proteção caso o painel ainda não exista
    
    const idx = contadorItensTR++;
    container.insertAdjacentHTML('beforeend', htmlItemTR(idx));
    renumerarItensTR();
};

window.removerItemTR = function(idx) {
    const bloco = document.getElementById(`item-tr-${idx}`);
    if (bloco) bloco.remove();
    renumerarItensTR();
};

function renumerarItensTR() {
    const blocos = document.querySelectorAll('#lista-itens-tr .item-tr');
    blocos.forEach((bloco, i) => {
        bloco.querySelector('.item-numero').textContent = `Item ${i + 1}`;
    });
}

window.resetarItensTR = function() {
    const container = document.getElementById('lista-itens-tr');
    if (container) {
        container.innerHTML = '';
        contadorItensTR = 0;
        adicionarItemTR(); 
    }
};

function coletarItensTR() {
    const blocos = document.querySelectorAll('#lista-itens-tr .item-tr');
    const itens = [];
    blocos.forEach(bloco => {
        const item = {};
        bloco.querySelectorAll('[data-campo]').forEach(el => {
            item[el.dataset.campo] = el.value || '';
        });
        itens.push(item);
    });
    return itens;
}



window.gerarDoc = async function(tipo) {
    const PizZipLib = window.PizZip || (typeof PizZip !== 'undefined' ? PizZip : null);

    if (!PizZipLib) {
        alert('A biblioteca PizZip não carregou. Verifique sua conexão ou recarregue a página.');
        return;
    }
    if (!carregados[tipo]) {
        alert(`Selecione o arquivo .docx do template ${tipo.toUpperCase()} primeiro.`);
        return;
    }

    const loader = document.getElementById(`load-${tipo}`);
    loader.style.display = 'inline';

    try {
        const formData = Object.fromEntries(new FormData(document.getElementById(`form-${tipo}`)));
        const dados = {};
        
      
        for (const campo in campos[tipo]) {
            dados[campos[tipo][campo]] = formData[campo] !== undefined ? formData[campo] : '';
        }

        if (tipo === 'tr') {
            dados.itens = coletarItensTR();
        }

        const zip = new PizZipLib(templates[tipo]);
        const doc = new window.docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
        doc.render(dados);

        const blob = doc.getZip().generate({
            type: 'blob',
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        });

        if (!blob || blob.size === 0) throw new Error('O documento gerado ficou vazio.');

        const dataAtual = new Date().toISOString().slice(0, 10);
        const nomeArquivo = `${tipo.toUpperCase()}_${dataAtual}.docx`;

        if (typeof saveAs === 'function') {
            saveAs(blob, nomeArquivo);
        } else if ('showSaveFilePicker' in window) {
            try {
                const handle = await window.showSaveFilePicker({
                    suggestedName: nomeArquivo,
                    types: [{
                        description: 'Word Document',
                        accept: { 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] }
                    }]
                });
                const w = await handle.createWritable();
                await w.write(blob);
                await w.close();
            } catch(err) {
                if (err.name !== 'AbortError') baixarBlob(blob, nomeArquivo);
            }
        } else {
            baixarBlob(blob, nomeArquivo);
        }

    } catch(e) {
        console.error(e);
        alert(`Erro ao gerar o documento: ${e.message}`);
    } finally {
        loader.style.display = 'none';
    }
};


window.addEventListener('load', () => {

    const base = 'https://raw.githubusercontent.com/locattimurilo/geradordedocumentos/main/templates/';
    carregarTemplate('dfd', base + 'DFD.docx');
    carregarTemplate('etp', base + 'ETP.docx');
    carregarTemplate('tr',  base + 'TR.docx');
    
  
    carregarPainel('dfd');
});