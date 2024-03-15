import React, {useEffect, useState} from 'react'; // Importação do React e de hooks como useEffect e useState
import { StyleSheet, Text, View, Image } from 'react-native'; // Importação de componentes básicos do React Native

const pessoa = { nome: 'Eldon', idade: 67, cidade: 'Rio de Janeiro', avatar: require('./assets/icon.png')}; // Definição de um objeto 'pessoa' com propriedades como nome, idade, cidade e avatar

function SaudacaoPersonalizada({ saudacao = "Olá", nome = "Usuário", style }) { // Declaração de um componente funcional 'SaudacaoPersonalizada' que recebe props como saudacao, nome e style
  return (
    <View style={[styles.saudacaoContainer, style]}> {/* Início da definição do layout com um estilo personalizado */}
      <Text>{saudacao}, {nome}!</Text> {/* Exibição da saudação com o nome fornecido */}
    </View>
  );
}

const Saudacao = ({ nome}) => { // Declaração de um componente funcional 'Saudacao' que recebe apenas o nome como prop
  return (
    <View style={styles.container}> {/* Início da definição do layout com estilo padrão */}
      <Text>Olá, {nome}!</Text> {/* Exibição da saudação padrão com o nome fornecido */}
    </View>
  );
};

const ExibirPessoa = ({ nome, idade, cidade }) => { // Declaração de um componente funcional 'ExibirPessoa' que recebe as propriedades de uma pessoa como props
  return (
    <View style={styles.container}> {/* Início da definição do layout com estilo padrão */}
      <Image source={pessoa.avatar} style={styles.avatar} /> {/* Exibição da imagem de avatar */}
      <Text>Nome: {nome}</Text> {/* Exibição do nome */}
      <Text>Idade: {idade}</Text> {/* Exibição da idade */}
      <Text>Cidade: {cidade}</Text> {/* Exibição da cidade */}
    </View>
  );
};

export default function App() { // Declaração do componente funcional principal 'App'
  const [saudacao, setSaudacao] = useState(''); // Definição do estado 'saudacao' e sua função de atualização
  useEffect(() => { // Efeito que é executado após a renderização inicial
    setSaudacao(getHora()); // Atualiza o estado de saudação com base na hora atual
  }, []);
  return (
    <View style={styles.appContainer}> {/* Início da definição do layout principal com estilo padrão */}
      {/* use o componente funcional personalizado com estilos personalizados */}
      <SaudacaoPersonalizada saudacao={saudacao} nome={pessoa.nome} style={styles.saudacaoPersonalizada} /> {/* Exibição do componente 'SaudacaoPersonalizada' com propriedades específicas */}
      <Saudacao nome={pessoa.nome} /> {/* Exibição do componente 'Saudacao' com o nome fornecido */}
      <ExibirPessoa {...pessoa} /> {/* Exibição do componente 'ExibirPessoa' com as propriedades da pessoa */}
    </View>
  );
}

function getHora() { // Declaração de uma função para obter a hora atual e retornar uma saudação adequada
  // Obter a hora UTC =====
  const horaUTC = new Date().getUTCHours();

  // Adicionar o deslocamento de -3 horas para o fuso horário do Brasil (Brasília) =====
  const horaBrasil = (horaUTC - 3 + 24) % 24; // O +24 é para garantir que o resultado seja positivo
  
  if (horaBrasil >= 5 && horaBrasil < 12) { // Verifica se é de manhã
    return 'Bom dia';
  } else if (horaBrasil >= 12 && horaBrasil < 18) { // Verifica se é de tarde
    return 'Boa tarde';
  } else { // Se não for nem de manhã nem de tarde, é de noite
    return 'Boa noite';
  }
}

const styles = StyleSheet.create({ // Definição de estilos para os componentes
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saudacaoContainer: {
    alignItems: 'right', // Alinha o conteúdo para a direita
    marginBottom: 10,
    padding: 10,  
  },
  saudacaoPersonalizada: {
    backgroundColor: 'lightblue', // Define a cor de fundo para saudação personalizada
    padding: 10,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom:10,
  }
});
