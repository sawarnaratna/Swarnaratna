import React from 'react';
import Layout from '../components/Layout';
import { Target, Users, Leaf, ShieldCheck } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="bg-stone-50 py-32 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-[#d4af37] text-[10px] font-black tracking-[0.4em] uppercase mb-8">Established 1994</h2>
            <h1 className="text-5xl md:text-8xl font-black text-stone-900 leading-none tracking-tighter mb-12">
              The Essence of <br />
              <span className="italic font-light">Pure Perfection.</span>
            </h1>
            <p className="text-xl text-stone-500 font-light leading-relaxed">
              At Swarnaratna, we don't just sell dry fruits. We curate experiences of wellness and luxury, sourced from the earth's most bountiful landscapes.
            </p>
          </div>
        </div>
      </div>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <img 
                src="/dry-fruits-wooden-luxury-jar-display-box.png" 
                alt="Our Heritage" 
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-emerald-900 -z-10 hidden lg:block" />
            </div>
            <div className="space-y-10">
              <h2 className="text-4xl font-black text-stone-900 tracking-tight uppercase">Our Heritage</h2>
              <p className="text-stone-500 text-lg font-light leading-relaxed">
                Our journey began in the vibrant markets of old India, where the trade of nuts and spices was an art form. Today, Swarnaratna stands as a testament to that heritage, blending traditional wisdom with modern quality standards.
              </p>
              <p className="text-stone-500 text-lg font-light leading-relaxed">
                We maintain direct relationships with farmers from California to Kabul, ensuring that every kernel that bears the Swarnaratna name is nothing short of extraordinary.
              </p>
              <div className="pt-8 grid grid-cols-2 gap-12">
                <div>
                  <h4 className="font-black text-emerald-900 uppercase tracking-widest text-xs mb-2">Sourcing</h4>
                  <p className="text-stone-400 text-sm font-light uppercase tracking-tighter">20+ Global Orchards</p>
                </div>
                <div>
                  <h4 className="font-black text-emerald-900 uppercase tracking-widest text-xs mb-2">Quality</h4>
                  <p className="text-stone-400 text-sm font-light uppercase tracking-tighter">Double Grade Certified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
            {[
              { icon: Target, title: "Pure Quality", desc: "We focus on the top 5% of global harvest for our customers." },
              { icon: Leaf, title: "100% Organic", desc: "Ethically grown without harmful pesticides or chemicals." },
              { icon: ShieldCheck, title: "Trusted Legacy", desc: "Transparency from orchard to table, every single time." },
            ].map((item, i) => (
              <div key={i} className="space-y-6">
                <div className="w-16 h-16 bg-white flex items-center justify-center shadow-xl">
                  <item.icon className="w-8 h-8 text-emerald-900" />
                </div>
                <h3 className="text-xl font-black text-stone-900 uppercase tracking-widest">{item.title}</h3>
                <p className="text-stone-500 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;


