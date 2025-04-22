const apiUrlVerificarCPF = 'https://back-seven-mauve.vercel.app/clientes/verificar';

document.addEventListener('DOMContentLoaded', function () {
    const entrarButton = document.getElementById('entrar');
    entrarButton.addEventListener('click', verificarCPF);
});

async function verificarCPF() {
    const cpfInput = document.getElementById('cpf');
    const res = document.getElementById('res');
    const cpf = cpfInput.value.trim();

    if (!cpf) {
        res.innerHTML = 'Por favor, digite o CPF.';
        return;
    }

    if (!/^\d{11}$/.test(cpf)) {
        res.innerHTML = 'CPF inválido. Digite exatamente 11 números.';
        document.getElementById('cpf').value = ''
        return;
    }

    try {
        const response = await fetch(apiUrlVerificarCPF, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cpf: cpf })
        });

        const data = await response.json();

        if (!response.ok) {
            res.innerHTML = '❌ CPF não cadastrado! Favor comparecer na recepção!';
            return;
        }

        if (data.status === 'ativo') {
            res.innerHTML = '✔️ Acesso Permitido! Bom Treino!';
            
        } else if (data.status === 'bloqueado') {
            res.innerHTML = '🚫 Acesso Negado! Favor comparecer na recepção!';
        } else {
            res.innerHTML = '';
        }

    } catch (error) {
        console.error("Erro ao comunicar com a API:", error);
        alert("Erro ao verificar o CPF. Tente novamente mais tarde.");
    }
}

document.getElementById("cpf").addEventListener("input", function () {
    if (this.value.length > 11) {
        this.value = this.value.slice(0, 11);
    }
});

function addNum(num) {
    const input = document.getElementById('cpf');
    if (input.value.length < 11) {
      input.value += num;
    }
  }

  function delNum() {
    const input = document.getElementById('cpf');
    input.value = input.value.slice(0, -1);
  }

  function limpar() {
    document.getElementById('cpf').value = '';
  }