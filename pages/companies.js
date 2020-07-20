import CompanyCard from './../components/cards/companyCard';

export default function Companies() {
    return (
        <div className="container-fluid mb-16">
              <div className="relative w-2/3 mx-auto my-10 md:w-1/2 lg:w-5/12">
                <i className="icon fas fa-search fa-2x absolute inline-block text-gray-400"></i>
                <input
                  className="appearance-none block w-full bg-white text-secondary placeholder-gray-400 border border-gray-400 rounded-full p-3 pl-20 focus:outline-none focus:border-primary"
                  id="search"
                  type="search"
                  name="search"
                  autoComplete="off"
                  placeholder="Type Company name"
                />
              </div>

            <div className="bg-white p-5 rounded-lg">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                <CompanyCard />
                <CompanyCard />
                <CompanyCard />
                <CompanyCard />
              </div>
            </div>
            <style jsx>{`
                .icon {
                top: 10px;
                left: 20px;
                }
            `}</style>
        </div>
        )
}