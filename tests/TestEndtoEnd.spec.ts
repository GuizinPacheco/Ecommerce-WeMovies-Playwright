import { test } from '@playwright/test';

test('Adicionar itens regressivo e somar preços com repetição', async ({ page }) => {
  await page.goto('http://wemovies-qa.s3-website.us-east-2.amazonaws.com/');

  // Quantos produtos deseja adicionar
  const quantidade = 10;  

  // Localiza todos os cards de produtos
  const produtos = page.locator('div.sc-dYwGCk.cBHYYm');
  const count = await produtos.count();  

  let total = 0;
    
  for (let i = 0; i < quantidade; i++) {
    // Sorteia um índice aleatório entre 0 e count-1
    const randomIndex = Math.floor(Math.random() * count);
    const produto = produtos.nth(randomIndex);

    // Pega o valor do item
    const valorText = await produto.locator('p').innerText(); // "R$ 9,99"
    const valorNumber = parseFloat(valorText.replace('R$', '').replace('&nbsp;', '').replace('.', '').replace(',', '.'));

    // Clica no botão "Adicionar ao carrinho"
    await produto.locator('button').click();

    // Soma ao total
    total += valorNumber;

    // Mostra log do item e do total parcial
    console.log(`Item ${i} (índice sorteado: ${randomIndex}) adicionado: R$ ${valorNumber.toFixed(2)} | Total parcial: R$ ${total.toFixed(2)}`);
  }

  // Total final
  const totalFinal = parseFloat(total.toFixed(2));
  console.log(`Total final: R$ ${totalFinal.toFixed(2)}`);

  // Clica no botão do carrinho
  const outroBotao = page.locator('button.sc-ggWZvA');
  await outroBotao.click();

  // Pega o valor do campo
  const valorCampoText = await page.locator('p.ktmCKx').innerText();
  const valorCampo = parseFloat(valorCampoText.replace('R$', '').replace('&nbsp;', '').replace('.', '').replace(',', '.'));

  // Compara e mostra log colorido
  if (totalFinal === valorCampo) {
    console.log(`\x1b[32mValor do teste automatizado R$ ${totalFinal.toFixed(2)} é equivalente ao valor do campo R$ ${valorCampo.toFixed(2)}\x1b[0m`);
  } else {
    console.log(`\x1b[31mValor do teste automatizado R$ ${totalFinal.toFixed(2)} não é equivalente ao valor do campo R$ ${valorCampo.toFixed(2)}\x1b[0m`);
  }

  await page.waitForTimeout(360);

  await page.getByRole('button', { name: 'Finalizar pedido' }).click();
  await page.getByRole('button', { name: 'Voltar' }).click();
});
   