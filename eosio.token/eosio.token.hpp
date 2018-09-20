/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */
#pragma once

#include <eosiolib/asset.hpp>
#include <eosiolib/eosio.hpp>

#include <string>

namespace eosiosystem {
   class system_contract;
}

namespace eosio {

   using std::string;

   class token : public contract {
      public:
         token( account_name self ):contract(self){}

         //@abi action
         void create( account_name issuer,
                      asset        maximum_supply);
         //@abi action
         void issue( account_name to, asset quantity, string memo );
         //@abi action
         void burn(asset quantity, string memo );
         //@abi action
         void transfer( account_name from,
                        account_name to,
                        asset        quantity,
                        string       memo );
      
         //@abi action
         inline asset get_supply( symbol_name sym )const;
         //@abi action
         inline asset get_balance( account_name owner, symbol_name sym )const;

      private:
         //@abi table
         struct account {
            asset    balance;

            uint64_t primary_key()const { return balance.symbol.name(); }
         };
         //@abi table
         struct currency_stats {
            asset          supply;
            asset          max_supply;
            account_name   issuer;

            uint64_t primary_key()const { return supply.symbol.name(); }
         };
         //@abi table
         typedef eosio::multi_index<N(accounts), account> accounts;
         //@abi table
         typedef eosio::multi_index<N(stat), currency_stats> stats;
         //@abi action
         void sub_balance( account_name owner, asset value );
         //@abi action
         void add_balance( account_name owner, asset value, account_name ram_payer );

      public:
         //@abi table
         struct transfer_args {
            account_name  from;
            account_name  to;
            asset         quantity;
            string        memo;
         };
   };

   asset token::get_supply( symbol_name sym )const
   {
      stats statstable( _self, sym );
      const auto& st = statstable.get( sym );
      return st.supply;
   }

   asset token::get_balance( account_name owner, symbol_name sym )const
   {
      accounts accountstable( _self, owner );
      const auto& ac = accountstable.get( sym );
      return ac.balance;
   }

} /// namespace eosio
