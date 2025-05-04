import React from 'react';
import { Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

/*Deixando o calendário em português*/
LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ],
  monthNamesShort: [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ],
  dayNames: [
    'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'
  ],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
};

LocaleConfig.defaultLocale = 'pt-br';


type Props = {
  selectedDate: string;
  onDateChange: (date: string) => void;
};

export const CalendarSelector: React.FC<Props> = ({ selectedDate, onDateChange }) => {
  const today = dayjs().format('YYYY-MM-DD');

  // Lista de datas disponíveis para marcação --- Passar para PHP
  const diasDisponiveis = [
    '2025-04-30', '2025-05-01' ,'2025-05-03', 
    '2025-05-11', '2025-05-13','2025-05-17',
    '2025-05-19', '2025-05-24', '2025-05-25',
    '2025-05-26', '2025-05-27','2025-05-30',
  ];

  // Adiciona hoje como disponível se não estiver na lista. Se não quiser o dia de hoje como disponível, só remover este trecho.
  /*if (!diasDisponiveis.includes(today)) {
    diasDisponiveis.push(today);
  }*/

  // Gera os dias marcados e desativados
  const generateMarkedDates = () => {
    const marks: any = {};

    //Vê se os dias disponíveis, já ultrapassaram a data atual
    diasDisponiveis.forEach(date => {
      if (dayjs(date).isBefore(today)) {
        marks[date] = {
          disabled: true,
          disableTouchEvent: true,
          customStyles: {
            text: {
              color: 'black',
            }
          }
        };
      } else {
        marks[date] = {
          customStyles: {
            container: {
              backgroundColor: '#246536',
              borderRadius: 100
            },
            text: {
              color: 'white',
              fontWeight: 'bold'
            }
          }
        };
      }
    });

    //Marca o dia atual com vermelho
    marks[today] = {
      customStyles: {
        container: {
          backgroundColor: '#e74c3c',
          borderRadius: 1000
        },
        text: {
          color: 'black',
          fontWeight: 'bold'
        }
      }
    };

    //Marca o dia selecionado (se válido)
    if (selectedDate && diasDisponiveis.includes(selectedDate)) {
      marks[selectedDate] = {
        customStyles: {
          container: {
            backgroundColor: '#2563eb',
            borderRadius: 1000
          },
          text: {
            color: 'white',
            fontWeight: 'bold'
          }
        }
      };
    }

    const getAllDaysOfCurrentMonth = () => {
      const start = dayjs().subtract(24, 'month').startOf('month');//Condição para desabilitar os dias não disponíveis
      const end = dayjs().add(24, 'month').endOf('month');
      const days = [];
  
      for (let date = start; date.isBefore(end) || date.isSame(end); date = date.add(1, 'day')) {
        days.push(date.format('YYYY-MM-DD'));
      }
  
      return days;
    };

    // Desativa os dias não disponíveis para não ser clicado.
    getAllDaysOfCurrentMonth().forEach(date => {
      if (date !== today && !diasDisponiveis.includes(date)) {
        marks[date] = {
          disabled: true,
          disableTouchEvent: true,
          customStyles: {
            text: {
              color: 'black'//Colocando cor nos dias não disponíveis
            }
          }

        };
      }
    });

    // Marca o selecionado com azul
    if (selectedDate && diasDisponiveis.includes(selectedDate)) {
      marks[selectedDate] = {
        customStyles: {
          container: {
            backgroundColor: '#2563eb',
            borderRadius: 1000
          },
          text: {
            color: 'white',
            fontWeight: 'bold'
          }
        }
      };
    }

    return marks;
  };

  //Permite desmarcar um dia se ele já estiver selecionado
  const handleDayPress = (day: any) => {
    if (diasDisponiveis.includes(day.dateString)) {
      if (day.dateString === selectedDate) {
        onDateChange(''); // desmarca o dia se for o mesmo
      } else {
        onDateChange(day.dateString); // marca um novo dia
      }
    }
  };

  return (
    <Calendar
      onDayPress={handleDayPress}
      markedDates={{
        ...generateMarkedDates(),
        //
      }}
      markingType="custom"
      renderArrow={(direction) => (
        <Text style={{ fontSize: 28, color: '#246536' }}>
          {direction === 'left' ? '‹' : '›'}
        </Text>
      )}

      renderHeader={(date) => {
        const mes = dayjs(date).locale('pt-br').format('MMMM');
        const ano = dayjs(date).format('YYYY');
    
        return (
          <Text
            style={{
              backgroundColor: '#246536',
              color: 'white',
              paddingVertical: 2,
              paddingHorizontal: 14,
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 'bold',
              overflow: 'hidden',
              textAlign: 'center'
            }}
          >
            {mes.charAt(0).toUpperCase() + mes.slice(1)} {ano}
          </Text>
        );
      }}
      theme={{
        dayTextColor: '#000',
        textDisabledColor: '#d9e1e8',
        textSectionTitleColor: '#246536',
        textDayFontSize: 12,
        textDayFontWeight: 'bold',
        textMonthFontSize: 14,
        textDayHeaderFontSize: 12,
      }}
      enableSwipeMonths={true}
    />
  );
};