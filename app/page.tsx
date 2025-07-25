// Adaptado para Next.js con dependencias externas (CDN)
'use client';

import React, { useState, useMemo } from 'react';
// Head se usa para inyectar scripts en el <head> del documento.
import Head from 'next/head';

// --- ICONOS SVG (reemplazo de lucide-react) ---
// En lugar de instalar el paquete, usamos directamente el código SVG de los íconos.
const ZapIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
);
const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const TargetIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
);
const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const BarChart2Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>
);
const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);
const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m9 18 6-6-6-6"/></svg>
);


// --- DATOS DE LA AUDITORÍA ---
const auditData = {
  questions: [
    {
      category: 'Omnicanalidad e Integración',
      question: '¿Qué tan bien integrado está tu programa de lealtad con tus canales de comunicación (Web, RRSS, Email, WhatsApp, etc.)?',
      options: [
        { text: 'No está integrado', score: 1 },
        { text: 'Hay integración parcial y manual', score: 2 },
        { text: 'Está integrado pero no sincronizado en tiempo real', score: 3 },
        { text: 'Bien integrado con algunos canales clave', score: 4 },
        { text: 'Totalmente integrado y automatizado en todos los canales', score: 5 },
      ],
    },
    {
      category: 'Experiencia Digital',
      question: '¿Cómo calificarías la experiencia digital (UX/UI) del sitio web o la plataforma donde vive tu programa?',
      options: [
        { text: 'Confusa y difícil de usar', score: 1 },
        { text: 'Funcional pero poco atractiva y algo compleja', score: 2 },
        { text: 'Clara y fácil de navegar, pero básica', score: 3 },
        { text: 'Moderna, intuitiva y agradable visualmente', score: 4 },
        { text: 'Excepcional, fluida y totalmente optimizada para móviles', score: 5 },
      ],
    },
    {
      category: 'Personalización',
      question: '¿Qué nivel de personalización ofreces en las recompensas y comunicaciones del programa?',
      options: [
        { text: 'Ninguna, todos los miembros reciben lo mismo', score: 1 },
        { text: 'Segmentación básica por nivel o antigüedad', score: 2 },
        { text: 'Comunicaciones personalizadas con el nombre del miembro', score: 3 },
        { text: 'Ofertas y recompensas basadas en el historial de compras', score: 4 },
        { text: 'Personalización predictiva y en tiempo real basada en IA', score: 5 },
      ],
    },
    {
      category: 'Comunicación y Engagement',
      question: '¿Con qué frecuencia y a través de qué canales comunicas activamente los beneficios y novedades del programa?',
      options:
      [
        { text: 'Casi nunca o solo al momento de la inscripción', score: 1 },
        { text: 'Ocasionalmente, principalmente por email', score: 2 },
        { text: 'De forma regular, pero en un solo canal principal', score: 3 },
        { text: 'Frecuentemente a través de múltiples canales (Email, RRSS)', score: 4 },
        { text: 'Constantemente, con campañas creativas y multicanal sincronizadas', score: 5 },
      ],
    },
    {
      category: 'Medición y Analítica',
      question: '¿Cómo mides el impacto y el ROI de tu programa de lealtad?',
      options: [
        { text: 'No medimos el impacto de forma sistemática', score: 1 },
        { text: 'Medimos métricas básicas como el número de miembros', score: 2 },
        { text: 'Analizamos la tasa de canje y la actividad general', score: 3 },
        { text: 'Tenemos un dashboard con KPIs clave (LTV, Frecuencia)', score: 4 },
        { text: 'Utilizamos modelos de atribución y análisis predictivo para optimizar el ROI', score: 5 },
      ],
    },
  ],
  resultsMatrix: {
    grades: [
      { threshold: 22, grade: 'A', title: 'Ecosistema de Lealtad de Élite', description: 'Tu programa es una máquina de fidelización bien engrasada. Está totalmente integrado, personalizado y optimizado. ¡Felicidades! El siguiente paso es la innovación constante.' },
      { threshold: 18, grade: 'B', title: 'Ecosistema de Lealtad Robusto', description: 'Tienes una base muy sólida. Tu programa funciona bien y genera valor, pero hay áreas clave, especialmente en comunicación o personalización avanzada, donde puedes mejorar para alcanzar la excelencia.' },
      { threshold: 13, grade: 'C', title: 'Ecosistema de Lealtad Funcional', description: 'Tu programa cumple su función básica, pero carece de la integración y la experiencia de usuario que define a los líderes. Tienes un gran potencial de crecimiento si inviertes en tecnología y estrategia.' },
      { threshold: 8, grade: 'D', title: 'Ecosistema de Lealtad Básico', description: 'Estás en las primeras etapas. Tu programa existe, pero no está conectado con tu ecosistema digital, lo que limita severamente su impacto. Es crucial desarrollar una estrategia de integración.' },
      { threshold: 0, grade: 'F', title: 'Necesitas un Plan de Lealtad', description: 'Tu programa de lealtad opera de forma aislada y con funcionalidades mínimas. Es el momento de re-evaluar tu estrategia desde cero para construir un ecosistema que realmente fidelice a tus clientes.' },
    ],
  },
};

// --- COMPONENTES DE LA UI ---
const WelcomeScreen = ({ onStart }: { onStart: () => void }) => (
  <div className="text-center max-w-3xl mx-auto">
    <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white leading-tight">
      ¿Qué tan robusto es el ecosistema digital donde vive tu{' '}
      <span className="text-indigo-500">programa de lealtad</span>?
    </h1>
    <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300">
      Descúbrelo en 2 minutos. Responde 5 preguntas clave y obtén un diagnóstico instantáneo de tu estrategia de fidelización.
    </p>
    <button
      onClick={onStart}
      className="mt-10 inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
    >
      Iniciar Auditoría Express
      <ChevronRightIcon className="ml-2 h-6 w-6" />
    </button>
  </div>
);

const QuestionScreen = ({ question, questionIndex, totalQuestions, onAnswer, onBack }: any) => {
  const progress = ((questionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-8">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2 text-sm text-gray-600 dark:text-gray-400">
          <span>Pregunta {questionIndex + 1} de {totalQuestions}</span>
          <span>{question.category}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-8">{question.question}</h2>
      <div className="space-y-4">
        {question.options.map((option: any, index: number) => (
          <button
            key={index}
            onClick={() => onAnswer(question.category, option.score)}
            className="w-full text-left p-5 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-200 ease-in-out group"
          >
            <span className="text-lg text-gray-700 dark:text-gray-200">{option.text}</span>
          </button>
        ))}
      </div>
       {questionIndex > 0 && (
        <button onClick={onBack} className="mt-8 text-sm text-gray-500 hover:text-indigo-600">
          &larr; Volver a la pregunta anterior
        </button>
      )}
    </div>
  );
};

const ResultsDashboard = ({ answers }: { answers: any }) => {
  // Se accede a los componentes de Recharts desde el objeto window global.
  // Esto solo funciona en el cliente, por lo que 'use client' es crucial.
  const { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } = (globalThis as any).Recharts || {};

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const categoryScores = useMemo(() => {
    const scores: { [key: string]: number } = {};
    auditData.questions.forEach(q => {
        scores[q.category] = answers[q.category] || 0;
    });
    return scores;
  }, [answers]);

  const totalScore = useMemo(() => Object.values(categoryScores).reduce((sum, score) => sum + score, 0), [categoryScores]);

  const result = useMemo(() => {
    return auditData.resultsMatrix.grades.find(g => totalScore >= g.threshold);
  }, [totalScore]);

  const chartData = useMemo(() => 
    Object.keys(categoryScores).map(category => ({
      subject: category,
      A: categoryScores[category],
      fullMark: 5,
    })),
  [categoryScores]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Email submitted:', email);
      setSubmitted(true);
    }
  };

  const icons: { [key: string]: React.ReactNode } = {
    'Omnicanalidad e Integración': <ZapIcon className="h-6 w-6 text-indigo-500" />,
    'Experiencia Digital': <UsersIcon className="h-6 w-6 text-teal-500" />,
    'Personalización': <TargetIcon className="h-6 w-6 text-amber-500" />,
    'Comunicación y Engagement': <MailIcon className="h-6 w-6 text-sky-500" />,
    'Medición y Analítica': <BarChart2Icon className="h-6 w-6 text-rose-500" />,
  };

  if (!result || !ResponsiveContainer) return <div className="text-center">Cargando resultados...</div>;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center">
          <p className="text-lg text-gray-500 dark:text-gray-400">Tu Calificación</p>
          <div className="my-4 text-8xl font-bold text-indigo-500">{result.grade}</div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{result.title}</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">{result.description}</p>
        </div>
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Dashboard de Resultados</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-80 w-full">
              <ResponsiveContainer>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                  <defs>
                    <radialGradient id="colorUv" cx="50%" cy="50%" r="80%">
                      <stop offset="0%" stopColor="#8884d8" stopOpacity={0.5}/>
                      <stop offset="100%" stopColor="#8884d8" stopOpacity={0}/>
                    </radialGradient>
                  </defs>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'currentColor', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
                  <Radar name="Tu Puntuación" dataKey="A" stroke="#8884d8" fill="url(#colorUv)" fillOpacity={0.8} />
                  <Tooltip contentStyle={{ backgroundColor: '#2d3748', border: 'none', borderRadius: '8px' }}/>
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {chartData.map(item => (
                <div key={item.subject} className="flex items-center">
                  <div className="flex-shrink-0 mr-4 bg-gray-100 dark:bg-gray-700 p-2 rounded-full">
                    {icons[item.subject]}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-baseline">
                      <p className="text-gray-800 dark:text-white font-semibold">{item.subject}</p>
                      <p className="text-gray-600 dark:text-gray-300 font-bold">{item.A}/5</p>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                      <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${(item.A / 5) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Recibe tu reporte completo</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Ingresa tu correo electrónico para enviarte un análisis detallado y recomendaciones personalizadas.
          </p>
        </div>
        {submitted ? (
          <div className="mt-6 text-center p-4 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg flex items-center justify-center">
            <CheckCircleIcon className="h-6 w-6 mr-3" />
            <p className="font-semibold">¡Gracias! Tu reporte ha sido enviado a {email}.</p>
          </div>
        ) : (
          <form onSubmit={handleEmailSubmit} className="mt-6 flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu.correo@empresa.com"
              required
              className="flex-grow px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border-2 border-transparent focus:border-indigo-500 focus:ring-0 rounded-lg transition"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
            >
              Enviar Reporte
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL DE LA PÁGINA ---
export default function HomePage() {
  const [step, setStep] = useState('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleStart = () => {
    setStep('questions');
  };

  const handleAnswer = (category: string, score: number) => {
    const newAnswers = { ...answers, [category]: score };
    setAnswers(newAnswers);

    if (currentQuestionIndex < auditData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStep('results');
    }
  };
  
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <>
      <Head>
        <title>Auditoría de Lealtad</title>
        {/* Carga Tailwind CSS desde el CDN */}
        <script src="https://cdn.tailwindcss.com"></script>
        {/* Carga Recharts desde el CDN */}
        <script src="https://unpkg.com/recharts/umd/Recharts.min.js"></script>
      </Head>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-500">
        <div className="w-full">
          {step === 'welcome' && <WelcomeScreen onStart={handleStart} />}
          
          {step === 'questions' && (
            <QuestionScreen
              question={auditData.questions[currentQuestionIndex]}
              questionIndex={currentQuestionIndex}
              totalQuestions={auditData.questions.length}
              onAnswer={handleAnswer}
              onBack={handleBack}
            />
          )}

          {step === 'results' && <ResultsDashboard answers={answers} />}
        </div>
      </main>
    </>
  );
}
