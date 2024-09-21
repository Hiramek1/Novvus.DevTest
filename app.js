// Desafios e Test Cases
const challenges = {
    processarPedidos: {
      description: "Implemente uma função que processe uma lista de pedidos e retorne um resumo com o total de pedidos, o valor total e a lista de clientes únicos.",
      testCases: [
        {
          input: [
            { Id: 1, Cliente: "Cliente A", Valor: 150, Data: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) },
            { Id: 2, Cliente: "Cliente B", Valor: 200, Data: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000) },
            { Id: 3, Cliente: "Cliente A", Valor: 300, Data: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) }
          ],
          expected: {
            TotalPedidos: 2,
            ValorTotal: 450,
            ClientesAtendidos: ["Cliente A"]
          }
        },
        {
          input: [
            { Id: 4, Cliente: "Cliente C", Valor: 100, Data: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) },
            { Id: 5, Cliente: "Cliente D", Valor: 250, Data: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000) },
            { Id: 6, Cliente: "Cliente C", Valor: 50, Data: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000) }
          ],
          expected: {
            TotalPedidos: 3,
            ValorTotal: 400,
            ClientesAtendidos: ["Cliente C", "Cliente D"]
          }
        }
      ]
    },
    
    dijkstra: {
      description: "Implemente o algoritmo de Dijkstra para encontrar o menor caminho de um nó de origem para todos os outros nós em um gráfico ponderado.",
      testCases: [
        {
          input: {
            graph: {
              A: { B: 1, C: 4 },
              B: { A: 1, C: 2, D: 5 },
              C: { A: 4, B: 2, D: 1 },
              D: { B: 5, C: 1 }
            },
            startNode: "A"
          },
          expected: { A: 0, B: 1, C: 3, D: 4 }
        },
        {
          input: {
            graph: {
              A: { B: 10, C: 3 },
              B: { C: 1, D: 2 },
              C: { B: 4, D: 8, E: 2 },
              D: { E: 7 },
              E: { D: 9 }
            },
            startNode: "A"
          },
          expected: { A: 0, B: 7, C: 3, D: 9, E: 5 }
        }
      ]
    }
  };
  
  // Função que roda os testes para o desafio selecionado
  function runTests(userFunction, challengeKey) {
    const challenge = challenges[challengeKey];
    let results = '';
    let allTestsPassed = true;
  
    challenge.testCases.forEach((testCase, index) => {
      const { input, expected } = testCase;
      let userOutput;
  
      try {
        userOutput = eval(`(${userFunction})(${JSON.stringify(input)})`);
      } catch (error) {
        results += `Erro no teste ${index + 1}: ${error.message}\n`;
        allTestsPassed = false;
        return;
      }
  
      if (JSON.stringify(userOutput) === JSON.stringify(expected)) {
        results += `Teste ${index + 1} passou.\n`;
      } else {
        results += `Teste ${index + 1} falhou. Resultado esperado: ${JSON.stringify(expected)}, resultado obtido: ${JSON.stringify(userOutput)}\n`;
        allTestsPassed = false;
      }
    });
  
    const resultElement = document.getElementById('result');
    if (allTestsPassed) {
      resultElement.innerHTML = `<pre style="color: green;">Todos os testes passaram!</pre>`;
    } else {
      resultElement.innerHTML = `<pre style="color: red;">${results}</pre>`;
    }
    
    persistResults(allTestsPassed);
  }
  
  // Função para persistir resultados em JSON
  function persistResults(passed) {
    const userName = document.getElementById('userName').value;
    const userCode = document.getElementById('codeInput').value;
    const selectedChallenge = document.getElementById('challengeSelector').value;
    
    if (!userName || !userCode) {
      alert('Por favor, insira seu nome e código!');
      return;
    }
  
    const resultData = {
      userName,
      challenge: selectedChallenge,
      code: userCode,
      passed
    };
  
    // Persistir no JSON local (apenas simulação para GitHub Pages, normalmente usaria backend)
    const existingData = localStorage.getItem('testResults') ? JSON.parse(localStorage.getItem('testResults')) : [];
    existingData.push(resultData);
    localStorage.setItem('testResults', JSON.stringify(existingData));
  
    alert('Resultado salvo com sucesso!');
  }
  
  // Inicializa o seletor de desafio
  document.getElementById('challengeSelector').addEventListener('change', (event) => {
    const selectedChallenge = event.target.value;
    const description = challenges[selectedChallenge].description;
    document.getElementById('challengeDescription').textContent = description;
  
    // Define a função esqueleto para cada desafio
    const functionSkeletons = {
      processarPedidos: `function processarPedidos(pedidos) {
        // Sua lógica aqui
      }`,
      dijkstra: `function dijkstra(graph, startNode) {
        // Sua lógica aqui
      }`
    };
  
    // Atualiza o campo codeInput com a função esqueleto do desafio selecionado
    document.getElementById('codeInput').value = functionSkeletons[selectedChallenge];
  });
  
  // Inicializa o botão para rodar os testes
  document.getElementById('runTests').addEventListener('click', () => {
    const userCode = document.getElementById('codeInput').value;
    const selectedChallenge = document.getElementById('challengeSelector').value;
  
    if (!userCode) {
      document.getElementById('result').innerHTML = '<pre style="color: red;">Por favor, insira o código!</pre>';
      return;
    }
  
    runTests(userCode, selectedChallenge);
  });
  
  // Inicializa a página com o primeiro desafio
  document.getElementById('challengeSelector').dispatchEvent(new Event('change'));