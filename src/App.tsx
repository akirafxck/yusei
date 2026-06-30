import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import {
  Users,
  Eye,
  Server,
  Droplets,
  Zap,
  MapPin,
  Menu,
  X,
  ArrowLeft,
  UserCircle,
  ChevronRight,
  Layers,
  CloudRain,
  TestTube,
  CircuitBoard,
  Droplet,
  Building2,
  Flame,
  ArrowRight
} from 'lucide-react';

type Tab = 'article' | 'creators';

const creators = [
  { name: 'Igor', role: 'Pesquisador', focus: 'Expansão de data centers no Brasil' },
  { name: 'Kauan', role: 'Pesquisador', focus: 'Impactos ambientais e conflitos territoriais' },
  { name: 'Fabian', role: 'Pesquisador', focus: 'Direitos indígenas e licenciamento' }
];

const coolingLayers = [
  {
    layer: 'Primeira',
    title: 'Mudar o tipo de resfriamento',
    icon: CircuitBoard,
    color: 'purple',
    content: 'Sistemas evaporativos são eficientes mas gastam água demais. Empresas testam alternativas como circuitos fechados, chillers de alta performance e placas de resfriamento que, segundo a Microsoft, podem reduzir o uso de água em até 30%. Modelos de imersão líquida, onde servidores ficam submersos em fluídos não condutores, praticamente eliminam a necessidade de água.'
  },
  {
    layer: 'Segunda',
    title: 'Águas residuais tratadas',
    icon: Building2,
    color: 'blue',
    content: 'Águas residuais municipais podem passar por tratamento adicional antes de serem usadas para refrigeração. A Veolia, empresa com mais de 30 anos na área de gestão de água, resíduos e energia, possui vasta rede municipal e pode trabalhar com operadores para tratar efluentes e fornecê-los aos sistemas de refrigeração.'
  },
  {
    layer: 'Terceira',
    title: 'Coleta de água da chuva',
    icon: CloudRain,
    color: 'cyan',
    content: 'Sistemas de coleta instalados no local capturam precipitação natural para refrigeração. Água superficial de canais, lagos ou outras fontes naturais oferece outra opção. O Google demonstrou isso na Holanda, onde utiliza água de canal em vez de água potável.'
  }
];

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('article');
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchAndIncrementVisits() {
      try {
        const { data: currentData } = await supabase
          .from('visit_counter')
          .select('count')
          .eq('id', 1)
          .single();

        if (currentData) setVisitCount(currentData.count);

        await supabase.rpc('increment_visit_count');

        const { data: newData } = await supabase
          .from('visit_counter')
          .select('count')
          .eq('id', 1)
          .single();

        if (newData) setVisitCount(newData.count);
      } catch (error) {
        console.error('Error with visit counter:', error);
      }
    }

    fetchAndIncrementVisits();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-700">
                <Server className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium text-gray-900 text-sm">Os Malefícios da IA</span>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => setActiveTab('article')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'article' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Artigo
              </button>
              <button
                onClick={() => setActiveTab('creators')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                  activeTab === 'creators' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Users className="w-4 h-4" />
                Criadores
              </button>
            </nav>

            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100">
              <Eye className="w-3.5 h-3.5 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">
                {visitCount !== null ? visitCount.toLocaleString('pt-BR') : '...'}
              </span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-3 border-t border-gray-100">
              <div className="flex flex-col gap-1">
                <button onClick={() => { setActiveTab('article'); setMobileMenuOpen(false); }} className={`px-4 py-2 rounded-lg text-sm font-medium text-left ${activeTab === 'article' ? 'bg-purple-100 text-purple-700' : 'text-gray-600'}`}>
                  Artigo
                </button>
                <button onClick={() => { setActiveTab('creators'); setMobileMenuOpen(false); }} className={`px-4 py-2 rounded-lg text-sm font-medium text-left flex items-center gap-2 ${activeTab === 'creators' ? 'bg-purple-100 text-purple-700' : 'text-gray-600'}`}>
                  <Users className="w-4 h-4" />
                  Criadores
                </button>
                <div className="flex items-center gap-2 px-4 py-2 mt-2 border-t border-gray-100 pt-3">
                  <Eye className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">{visitCount !== null ? visitCount.toLocaleString('pt-BR') : '...'}</span>
                  <span className="text-xs text-gray-500">visitas</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'article' ? <ArticleView /> : <CreatorsView onBack={() => setActiveTab('article')} />}
      </main>

    </div>
  );
}

function ArticleView() {
  const [expandedLayer, setExpandedLayer] = useState<number | null>(null);

  return (
    <article className="space-y-10">
      {/* Title */}
      <header className="text-center pb-6 border-b border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Os Malefícios da IA</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Impactos socioambientais da expansão de data centers no Brasil e seus efeitos sobre comunidades indígenas
        </p>
      </header>

      {/* Impact Section */}
      <section>
        <p className="text-gray-700 leading-relaxed mb-4">
          O processo de treinamento de um único modelo de IA, como um LLM, pode consumir milhares de megawatts-hora de eletricidade e emitir centenas de toneladas de carbono. O treinamento também pode levar à evaporação de grande quantidade de água doce para dissipação de calor em data centers, exacerbando a pressão sobre recursos hídricos já limitados.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          A construção de data centers em áreas rurais no Brasil tem se intensificado, motivada por terrenos amplos, energia mais barata e climas favoráveis. Esse movimento gera conflitos significativos com comunidades indígenas e tradicionais. O caso mais característico é a construção de um "mega data center" do TikTok (ByteDance) com a Casa dos Ventos e Omnia em Caucaia (CE), nas proximidades de terras do povo Anacé.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Indígenas Anacés relataram denúncias de que o projeto avançava sem diálogo necessário, violando o direito de consulta prévia, previsto na Convenção 169 da OIT. O data center consumirá grandes volumes de energia (210 MW/dia) e água, preocupando a comunidade local, especialmente diante de histórico de secas e estresse hídrico.
        </p>
        <p className="text-gray-700 leading-relaxed">
          A instalação ocorre em uma Área de Proteção Ambiental (APA) e sobre terras reivindicadas como tradicionais pelo povo Anacé. Em protesto, indígenas bloquearam rodovias e protocolaram queixas junto a autoridades federais, exigindo suspensão do licenciamento ambiental.
        </p>
      </section>

      {/* Stats Embeds - Apple Style */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 p-5 text-white cursor-pointer hover:scale-[1.02] transition-transform duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <Zap className="w-6 h-6 mb-3 opacity-90" />
          <p className="text-xs uppercase opacity-80 mb-1">Energia</p>
          <p className="text-2xl font-bold">210 MW/dia</p>
        </div>
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-5 text-white cursor-pointer hover:scale-[1.02] transition-transform duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <Droplets className="w-6 h-6 mb-3 opacity-90" />
          <p className="text-xs uppercase opacity-80 mb-1">Água</p>
          <p className="text-2xl font-bold">Alto consumo</p>
        </div>
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-700 to-purple-900 p-5 text-white cursor-pointer hover:scale-[1.02] transition-transform duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <MapPin className="w-6 h-6 mb-3 opacity-90" />
          <p className="text-xs uppercase opacity-80 mb-1">Local</p>
          <p className="text-2xl font-bold">Caucaia, CE</p>
        </div>
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 p-5 text-white cursor-pointer hover:scale-[1.02] transition-transform duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <Flame className="w-6 h-6 mb-3 opacity-90" />
          <p className="text-xs uppercase opacity-80 mb-1">Afetados</p>
          <p className="text-2xl font-bold">Povo Anacé</p>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-6 sm:p-8 bg-gradient-to-r from-gray-900 to-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-300 text-sm font-medium mb-1">Soluções</p>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Cortando o consumo pela raiz</h2>
            </div>
            <Droplet className="w-10 h-10 text-purple-400 opacity-50" />
          </div>
          <p className="text-gray-400 mt-3 text-sm max-w-xl">
            A IA está deixando claro o tamanho da sua sede, mas já existe uma corrida paralela para reduzir esse consumo. Como resfriar máquinas cada vez mais potentes sem depender de tanta água potável?
          </p>
        </div>

        <div className="p-4 sm:p-6">
          <p className="text-gray-600 text-sm mb-6 flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-600" />
            A resposta precisa ser explicada em camadas
          </p>

          <div className="space-y-3">
            {coolingLayers.map((layer, index) => {
              const IconComponent = layer.icon;
              const isExpanded = expandedLayer === index;
              const colorClasses = {
                purple: 'from-purple-600 to-purple-800 bg-purple-50 border-purple-200 text-purple-600',
                blue: 'from-blue-500 to-blue-700 bg-blue-50 border-blue-200 text-blue-600',
                cyan: 'from-cyan-500 to-cyan-700 bg-cyan-50 border-cyan-200 text-cyan-600'
              };

              return (
                <div
                  key={index}
                  onClick={() => setExpandedLayer(isExpanded ? null : index)}
                  className={`group rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isExpanded
                      ? `${colorClasses[layer.color as keyof typeof colorClasses].split(' ').slice(2).join(' ')} border-current`
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-4 p-4">
                    <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${colorClasses[layer.color as keyof typeof colorClasses].split(' ').slice(0, 2).join(' ')}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium ${isExpanded ? 'text-current opacity-70' : 'text-gray-500'}`}>
                        {layer.layer} camada
                      </p>
                      <p className={`font-semibold ${isExpanded ? 'text-gray-900' : 'text-gray-800'}`}>
                        {layer.title}
                      </p>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-90' : 'group-hover:translate-x-0.5'}`} />
                  </div>

                  <div className={`overflow-hidden transition-all duration-300 ease-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-4 pb-4 pt-0">
                      <div className="pl-15 ml-11 border-l-2 current:border-current border-gray-100 pl-4">
                        <p className="text-gray-700 text-sm leading-relaxed">{layer.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </article>
  );
}

function CreatorsView({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-purple-700 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Voltar ao artigo</span>
      </button>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-900 px-6 py-5">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Criadores do Projeto</h2>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {creators.map((creator, index) => (
            <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-purple-200 hover:bg-purple-50/30 transition-all duration-300">
              <UserCircle className="w-12 h-12 text-gray-400" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{creator.name}</h3>
                  <span className="px-2 py-0.5 text-xs rounded bg-purple-100 text-purple-700">{creator.role}</span>
                </div>
                <p className="text-sm text-gray-600">{creator.focus}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
