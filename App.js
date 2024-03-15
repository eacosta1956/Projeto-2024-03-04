import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

// Criando um objeto com propriedades
const pessoa = { nome: 'Eldon', idade: 67, cidade: 'Rio de Janeiro', avatar: require('./assets/icon.png')};

// Componente funcional personalizado. 
// Essa é a primeira saudação, que aparece em um fundo colorido
function SaudacaoPersonalizada({ saudacao = "Olá", nome = "Usuário", style }) {
  return (
    <View style={[styles.saudacaoContainer, style]}>
      <Text>{saudacao}, {nome}!</Text>
    </View>
  );
}

// Essa é a segunda saudação
const Saudacao = ({ nome}) => {
  return (
    <View style={styles.container}>
      <Text>Olá, {nome}!</Text>
    </View>
  );
};

const ExibirPessoa = ({ nome, idade, cidade }) => {
  return (
    <View style={styles.container}>
      <Image source={pessoa.avatar} style={styles.avatar} />
      <Text>Nome: {nome}</Text>
      <Text>Idade: {idade}</Text>
      <Text>Cidade: {cidade}</Text>
    </View>
  );
};

export default function App() {
  const [saudacao, setSaudacao] = useState('');
  useEffect(() => {
    setSaudacao(getHora());
  }, []);
  return (
    <View style={styles.appContainer}>
      {/* use o componente funcional personalizado com estilos personalizados */}
      <SaudacaoPersonalizada saudacao={saudacao} nome={pessoa.nome} style={styles.saudacaoPersonalizada} />
      <Saudacao nome={pessoa.nome} />
      <ExibirPessoa {...pessoa} />
    </View>
        );
}

function getHora() {
  // Obter a hora UTC
  const horaUTC = new Date().getUTCHours();

  // Adicionar o deslocamento de -3 horas para o fuso horário do Brasil (Brasília)
  const horaBrasil = (horaUTC - 3 + 24) % 24; // O +24 é para garantir que o resultado seja positivo
  
  //console.log(horaBrasil); // Logs a hora atual no fuso horário do Brasil para a console
  
  if (horaBrasil >= 5 && horaBrasil < 12) {
    return 'Bom dia';
  } else if (horaBrasil >= 12 && horaBrasil < 18) {
    return 'Boa tarde';
  } else {
    return 'Boa noite';
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saudacaoContainer: {
    alignItems: 'right',
    marginBottom: 10,
    padding: 10,  
  },
  saudacaoPersonalizada: {
    backgroundColor: 'lightblue',
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




